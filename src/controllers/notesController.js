const db=require('../config/database');

const getAllNotes=async (req,res,next)=>{
    try {
        const queryResponse=await db.query('SELECT * FROM notes ORDER BY created_at DESC');
        res.status(200).json(queryResponse.rows)
    } catch (error) {
        next(error)
    }
};
const getSpecificNotes=async (res,pathParts)=>{
    const id=pathParts[2];
    if(!/^\d+$/.test(id)){
        return res.status(400).json("Formato de Id invalido");
    }
    try {
        const queryReponse=await db.query('SELECT * FROM notes WHERE id=$1',[id]);
        if(queryReponse.rows.length===0){
            return res.status(404).json('No encontrado');
        }
        res.status(200).json(queryReponse.rows[0]);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
const createNote=async(req,res,next)=>{
    const {title,content}=req.body;
    if(!title||title.trim()===''||title.length>200){
        const error= new Error('El campo title es obligatorio y no debe exceder los 200 caracteres');
        error.status=400;
        return next(error);
    }
    try{
        const queryInsert= await db.query('INSERT INTO notes (title,content) VALUES ($1,$2) RETURNING *',[title,content]);
        res.status(201).json(queryInsert.rows[0])    
    } catch(error){
        error.status=500;
        next(error);
    }
};
/*
const updateNote=async(req,res,pathParts)=>{
    // Parseamos el id
    const id=pathParts[2];
    if(!/^\d+$/.test(id)){
        return errorResponse(res,400,"Formato de Id invalido")
    }
    // Iniciamos el pedido de los chunks
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
            return errorResponse(res,400,"JSON inválido en el cuerpo de la solicitud")
        }
            // Validamos  que el campo title sea caracteres validos y un maximo de 200 caracteres
        const {title}=newBody;
        if(title!==undefined){
            if (title.trim()===''||title.length>200){
                return errorResponse(res,400, "El campo Title debe ser válido y menos de máximo 200 caracteres");
            }
        }
            //Gestión de la consulta a la db
        try {
            const queryUpdate= await db.query('UPDATE notes SET title=COALESCE ($1,title), content=COALESCE($2,content), updated_at=NOW() WHERE id=$3 RETURNING *',[newBody.title || null,newBody.content || null,id]);
            if (queryUpdate.rowCount===0){
                return errorResponse(res,404," El id establecido no se encuentra")
            }
            successResponse(res,200,queryUpdate.rows[0])
        }catch(error){
            errorResponse(res,500,error.message)
        }
    })
};
const deleteNote=async (res,pathParts)=>{
    // Parseamos el id
    const id=pathParts[2];
    if(!/^\d+$/.test(id)){
        return errorResponse(res,400,"Formato de Id invalido")
    }
    try{
        const queryDetele=await db.query('DELETE FROM notes WHERE id=$1 RETURNING *',[id]);
        if(queryDetele.rowCount===0){
            return errorResponse(res, 404, "El Id establecido no existe")
        }
        const customResponse={
            message:"Eliminación de nota exitosa",
            deletedNote:queryDetele.rows[0]
        };
        successResponse(res,200,customResponse)
    }catch(error){
        errorResponse(res,500, error.message)
    }
}
*/

module.exports={
    getAllNotes,
    getNoteById:getSpecificNotes,
    createNote
    //updateNote,
    //deleteNote
}