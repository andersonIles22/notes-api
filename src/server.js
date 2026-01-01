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
    else if(path.startsWith('/api/notes/') && req.method==='GET'){
        const getId=path.split('/')[3];
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
    else if (path.startsWith('/api/notes/') && req.method==='PUT'){
        // Realizamos la validación de que el id sea solo un numero
        const getId= path.split('/')[3];
        if(!getId || getId.trim()===""||isNaN(getId)){
            return responseErrorServer(res,400,"Formato de Id Invalido");
        }
        // De manera asincrona establecemos que se reciba los chunks del request JSON
        let newBody='';
        req.on('data',chunk=>{
            newBody+=chunk.toString();
        });
        // Inicio del manejo de los chunks
        req.on('end',async ()=> {
                // Parseamos el formato del cuerpo JSON recibido
            try{
                newBody=JSON.parse(newBody);
            }catch(error){
                return responseErrorServer(res,400,"JSON inválido en el cuerpo de la solicitud")
            }
                // Validamos  que el campo title sea caracteres validos y un maximo de 200 caracteres
            const {title}=newBody;
            if(title!==undefined){
                if (title.trim()===''||title.length>200){
                    return responseErrorServer(res,400, "El campo Title debe ser válido y menos de máximo 200 caracteres");
                }
            }
                //Gestión de la consulta a la db
            try {
                const queryUpdate= await db.query('UPDATE notes SET title=COALESCE ($1,title), content=COALESCE($2,content), updated_at=NOW() WHERE id=$3 RETURNING *',[newBody.title || null,newBody.content || null,getId]);
                if (queryUpdate.rowCount===0){
                    return responseErrorServer(res,404," El id establecido no se encuentra")
                }
                responseSuccessfulServer(res,200,queryUpdate.rows[0])
            }catch(error){
                responseErrorServer(res,500,error.message)
            }
        });

    }
    else if(path.startsWith('/api/notes/') && req.method==='DELETE'){
        //  Validamos que el id exista y sea un numero
        const getID= path.split('/')[3];
        if(!getID || getID.trim()==='' || isNaN(getID)){
            return responseErrorServer(res, 400, "Formato ID invalido")
        }
        // Gestionamos la eliminacion del registro en la bd
        try{
            const queryDetele=await db.query('DELETE FROM notes WHERE id=$1 RETURNING *',[getID]);
            if(queryDetele.rowCount===0){
                return responseErrorServer(res, 404, "El Id establecido no existe")
            }
            const customResponse={
                message:"Eliminación de nota exitosa",
                deletedNote:queryDetele.rows[0]
            };
            responseSuccessfulServer(res,200,customResponse)
        }catch(error){
            responseErrorServer(res,500, error.message)
        }

    }
    else{
        responseErrorServer(res,404,'404 Endpoint not found');
    }
});

server.listen(options.PORT,options.HOST,()=>{
    console.log(`Server running at http://${options.HOST}:${options.PORT}/`);
});


