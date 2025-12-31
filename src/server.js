const http=require('http');
const db=require('./config/database');

const options={
    HOST:'localhost',
    PORT:3000
};
// Funciones auxiliares para manejar respuestas
const responseSuccessfulServer=(res,statusCode,message)=>{
    res.statusCode=statusCode;
    typeof message==='string' ? res.end(JSON.stringify({message:message})) :  res.end(JSON.stringify(message));
};
const responseErrorServer=(res,statusCode,message)=>{
    res.statusCode=statusCode;
    res.end(JSON.stringify({error:message}));
};
// Normalizamos la ruta eliminando la barra final para que '/api/notes/' sea igual a '/api/notes'
const parsedUrl=(req,basedUrl)=>{
    let newUrl=new URL(req.url,basedUrl);
    let path=newUrl.pathname;
    if(newUrl.pathname.length>1 && newUrl.pathname.endsWith('/')){
        path=path.slice(0,-1);
    }
    return path;
}

const getALLNotes=async ()=>{
    const queryResponse=await db.query('SELECT * FROM notes');
    return queryResponse.rows;
};
const getSpecificNotes=async (id)=>{
    const queryReponse=await db.query('SELECT * FROM notes WHERE id=$1',[id]);
    return queryReponse.rows;
}
const server=http.createServer( async (req,res)=>{
    const path=parsedUrl(req,`http://${options.HOST}:${options.PORT}`);

    res.setHeader('Content-Type','application/json');
    if(path==='/' && req.method==='GET'){
        responseSuccessfulServer(res,200,'API is running!');
    }
    else if (path === '/api/notes' && req.method === 'GET') {
    try {
        const rows = await getALLNotes();
        responseSuccessfulServer(res, 200, rows);
    } catch (error) {
        console.error("Error en la DB:", error.message);
        responseErrorServer(res, 500, error.message);
    }
    }
    else if(path.startsWith('/api/notes/')&& req.method==='GET'){
        const getId=path.split('/')[3];
        console.log(getId)
        if(!getId || getId.trim()===""||isNaN(getId)){
            return responseErrorServer(res,400,"Formato de Id Invalido");
        }
        try{
            const rows= await getSpecificNotes(getId);
            if (rows.length===0){
                return responseErrorServer(res,404,"Nota no encontrada")
            }
            responseSuccessfulServer(res,200, rows[0])

        }catch(error){
            responseErrorServer(res, 500, error.message)
        }
    }
    else if(path==='/api/notes' && req.method==='POST'){
            let body='';
            req.on('data',chunk=>{
                body+=chunk.toString();
            });
            req.on('end',async ()=>{
                try{
                    body=JSON.parse(body);
                } catch(error){
                    return responseErrorServer(res,400,'JSON inválido en el cuerpo de la solicitud');
                }
                const {title,content}=body;
                if(!title || title.trim()===''||title.length>200){
                    return responseErrorServer(res,400,'El campo title es obligatorio y no debe exceder los 200 caracteres');
                }
                try{
                    const queryRequest= await db.query('INSERT INTO notes (title,content) VALUES ($1,$2) RETURNING *',[title,content]);
                    responseSuccessfulServer(res,201,queryRequest.rows[0]);    
                } catch(error){
                    console.error('Error en la DB:',error.message);
                    responseErrorServer(res,500,error.message);
                }
                });
    }
    else{
        responseErrorServer(res,404,'404 Endpoint not found');
    }
});

server.listen(options.PORT,options.HOST,()=>{
    console.log(`Server running at http://${options.HOST}:${options.PORT}/`);
});


