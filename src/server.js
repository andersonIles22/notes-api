const http=require('http');
const {handleNotesRoutes}=require('./routes/notesRoutes');
const {successResponse,errorResponse}=require('./utils/response');

const options={
    HOST:'localhost',
    PORT:3000
};
// Función del servidor
const server=http.createServer( async (req,res)=>{
    const url=new URL(req.url,`http://${options.HOST}:${options.PORT}`);
    const pathParts=url.pathname.split('/').filter(Boolean);
    res.setHeader('Content-Type','application/json');
    if(req.url==='/'){
        successResponse(res,200,'API is running!');
        return;
    }
    if (pathParts[0]==='api' && pathParts[1]==='notes') {
        await handleNotesRoutes(req,res,req.method,pathParts);
        return;
    }
    // else if(path.startsWith('/api/notes/') && req.method==='GET'){
    //     const getId=path.split('/')[3];
    //     if(!getId || getId.trim()===""||isNaN(getId)){
    //         return responseErrorServer(res,400,"Formato de Id Invalido");
    //     }
    //     try{
    //         const rows= await getNoteById(getId);
    //         if (rows.length===0){
    //             return responseErrorServer(res,404,"Nota no encontrada")
    //         }
    //         responseSuccessfulServer(res,200, rows[0])

    //     }catch(error){
    //         responseErrorServer(res, 500, error.message)
    //     }
    // }
    // else if(path==='/api/notes' && req.method==='POST'){
    //         let body='';
    //         req.on('data',chunk=>{
    //             body+=chunk.toString();
    //         });
    //         req.on('end',async ()=>{
    //             try{
    //                 body=JSON.parse(body);
    //             } catch(error){
    //                 return responseErrorServer(res,400,'JSON inválido en el cuerpo de la solicitud');
    //             }
    //             const {title,content}=body;
    //             if(!title || title.trim()===''||title.length>200){
    //                 return responseErrorServer(res,400,'El campo title es obligatorio y no debe exceder los 200 caracteres');
    //             }
    //             try{
    //                 const queryInsert= await createNote(title,content);
    //                 responseSuccessfulServer(res,201,queryInsert[0]);    
    //             } catch(error){
    //                 console.error('Error en la DB:',error.message);
    //                 responseErrorServer(res,500,error.message);
    //             }
    //             });
    // }
    // else if (path.startsWith('/api/notes/') && req.method==='PUT'){
    //     // Realizamos la validación de que el id sea solo un numero
    //     const getId= path.split('/')[3];
    //     if(!getId || getId.trim()===""||isNaN(getId)){
    //         return responseErrorServer(res,400,"Formato de Id Invalido");
    //     }
    //     // De manera asincrona establecemos que se reciba los chunks del request JSON
    //     let newBody='';
    //     req.on('data',chunk=>{
    //         newBody+=chunk.toString();
    //     });
    //     // Inicio del manejo de los chunks
    //     req.on('end',async ()=> {
    //             // Parseamos el formato del cuerpo JSON recibido
    //         try{
    //             newBody=JSON.parse(newBody);
    //         }catch(error){
    //             return responseErrorServer(res,400,"JSON inválido en el cuerpo de la solicitud")
    //         }
    //             // Validamos  que el campo title sea caracteres validos y un maximo de 200 caracteres
    //         const {title}=newBody;
    //         if(title!==undefined){
    //             if (title.trim()===''||title.length>200){
    //                 return responseErrorServer(res,400, "El campo Title debe ser válido y menos de máximo 200 caracteres");
    //             }
    //         }
    //             //Gestión de la consulta a la db
    //         try {
    //             const queryUpdate= await updateNote(newBody,getId);
    //             if (queryUpdate.rowCount===0){
    //                 return responseErrorServer(res,404," El id establecido no se encuentra")
    //             }
    //             responseSuccessfulServer(res,200,queryUpdate.rows[0])
    //         }catch(error){
    //             responseErrorServer(res,500,error.message)
    //         }
    //     });

    // }
    // else if(path.startsWith('/api/notes/') && req.method==='DELETE'){
    //     //  Validamos que el id exista y sea un numero
    //     const getID= path.split('/')[3];
    //     if(!getID || getID.trim()==='' || isNaN(getID)){
    //         return responseErrorServer(res, 400, "Formato ID invalido")
    //     }
    //     // Gestionamos la eliminacion del registro en la bd
    //     try{
    //         const queryDetele=await deleteNote(getID)
    //         if(queryDetele.rowCount===0){
    //             return responseErrorServer(res, 404, "El Id establecido no existe")
    //         }
    //         const customResponse={
    //             message:"Eliminación de nota exitosa",
    //             deletedNote:queryDetele.rows[0]
    //         };
    //         responseSuccessfulServer(res,200,customResponse)
    //     }catch(error){
    //         responseErrorServer(res,500, error.message)
    //     }

    // }

    return errorResponse(res,404,'404 Endpoint not found');
});

server.listen(options.PORT,options.HOST,()=>{
    console.log(`Server running at http://${options.HOST}:${options.PORT}/`);
});


