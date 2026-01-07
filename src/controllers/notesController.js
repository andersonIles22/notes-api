const db=require('../config/database');
const {successResponse,error}=require('../utils/response')
const getAllNotes=async (req,res,next)=>{
    try {
        const queryResponse=await db.query('SELECT * FROM notes ORDER BY created_at DESC');
        successResponse(res,400,queryResponse.rows);
    } catch (error) {
        next(error)
    }
};
const getSpecificNotes=async (req,res,next)=>{
    const id=req.params.id
    if(!/^\d+$/.test(id)){
        return error(400,'Valor id es invalido',next);
    }
    try {
        const queryReponse=await db.query('SELECT * FROM notes WHERE id=$1',[id]);
        if(queryReponse.rows.length===0){
        return error(404,'El id no existe',next);
        }
        successResponse(res,200,queryReponse.rows[0]);
    } catch (error) {
        next(error);
    }
};
const createNote=async(req,res,next)=>{
    const {title,content}=req.body;
    if(!title||title.trim()===''||title.length>200){
        error(400,'El campo title es obligatorio y no debe exceder los 200 caracteres',next)
    }
    try{
        const queryInsert= await db.query('INSERT INTO notes (title,content) VALUES ($1,$2) RETURNING *',[title,content]);
        successResponse(res,201,queryInsert.rows[0])  
    } catch(error){
        error.status=500;
        next(error);
    }
};

const updateNote=async(req,res,next)=>{
    //Validamos que el valor id es correcto
    const id=Number(req.params.id);
    if(Number.isNaN(id)){
        return error(400,'Valor id es invalido',next);
    }
        // Validamos  que el campo title sea caracteres validos y un maximo de 200 caracteres
    const {title}=req.body;
    if(title!==undefined){
        if (title.trim()===''||title.length>200){
            return error(400,'El titulo debe ser valido y el valor debe ser menor a 200 caracteres',next)
        }
    }
        // Gestión de la consulta a la db
    try {
        const queryUpdate= await db.query('UPDATE notes SET title=COALESCE ($1,title), content=COALESCE($2,content), updated_at=NOW() WHERE id=$3 RETURNING *',[req.body.title || null,req.body.content || null,id]);
        if(queryUpdate.rowCount===0){
            return error(404,'Id no existente',next);
        }
        successResponse(res,200,'Actualización Exitosa')
    }catch(error){
        next(error);
    }
}
const deleteNote=async (req,res,next)=>{
    //Parseamos el id
    const id=Number(req.params.id);
    if(Number.isNaN(id)){
        return error(400,'Valor id es invalido',next);
    }
    try{
        const queryDetele=await db.query('DELETE FROM notes WHERE id=$1 RETURNING *',[id]);
        if(queryDetele.rowCount===0){
        return error(400,'Id no existente',next);
        }
        successResponse(res,200,'Eliminación existosa')
    }catch(error){
        next(error);
    }
}


module.exports={
    getAllNotes,
    getNoteById:getSpecificNotes,
    createNote,
    updateNote,
    deleteNote
}