
const db=require('../config/database');
const {successGet,successPost,successPut,successDelete}=require('../utils/successResponses');
const {error}=require('../middleware/errorHandlers');
const {HTTP_STATUS}=require('../constants/httpStatusCode');
const {NOTES_QUERIES,NOTES_ERRORS}=require('./notesConstants');


/**
 * Retrieve all notes from database sorted by creation date.
 * @route GET /api/notes
 * @param {Object} req -  Request object of Express. 
 * @param {Object}  res - Response object of Express. 
 * @param {Function} next - Function to next middelware. 
 */

const getAllNotes=async (req,res,next)=>{
    try {
        const queryResponse=await db.query(NOTES_QUERIES.GET_ALL_NOTES);
        successGet(res,HTTP_STATUS.OK,queryResponse.rows)
    } catch (error) {
        next(error)
    }
};

/**
 * Retrieve  note by Id from database.
 * @route GET /api/notes
 * @param {Object} req -  Request object of Express. 
 * @param {Object}  res - Response object of Express. 
 * @param {Function} next - Function to next middelware. 
 */
const getNoteById=async (req,res,next)=>{
    const {id}=req.params;
    try {
        const queryReponse=await db.query(NOTES_QUERIES.GET_NOTE_BY_ID,[id]);
        if(queryReponse.rows.length===0){
        return error(HTTP_STATUS.BAD_REQUEST,NOTES_ERRORS.ID_NOT_FOUND,next);
        }
        successGet(res,HTTP_STATUS.OK,queryReponse.rows[0]);
    } catch (error) {
        next(error);
    }
};

/**
 * Insertion of title and content into database
 * @route POST /api/notes
 * @param {Object} req -  Request object of Express 
 * @param {Object}  res - Response object of Express 
 * @param {Function} next - Function to next middelware 
 */
const createNote=async(req,res,next)=>{
    const {title,content}=req.body;
    try{
        const queryInsert= await db.query(NOTES_QUERIES.CREATE_NOTE,[title,content]);
        successPost(res,HTTP_STATUS.CREATED,queryInsert.rows[0])  
    } catch(error){
        next(error);
    }
};

/**
 * Update title or content by ID of note, from database.
 * @route PUT /api/notes
 * @param {Object} req -  Request object of Express.
 * @param {Object}  res - Response object of Express. 
 * @param {Function} next - Function to next middelware. 
 */

const updateNote=async(req,res,next)=>{
    console.log(req);
    
    const {id}=req.params;
    const {title}=req.body;
        // Gestión de la consulta a la db
    try {
        const queryUpdate= await db.query(NOTES_QUERIES.UPDATE_NOTE,[req.body.title || null,req.body.content || null,id]);
        if(queryUpdate.rowCount===0){
            return error(HTTP_STATUS.NOT_FOUND,NOTES_ERRORS.ID_NOT_FOUND,next);
        }
        successPut(res,HTTP_STATUS.OK,queryUpdate.rows[0])
    }catch(error){
        next(error);
    }
}

/**
 * Delete note by ID from database.
 * @route DELETE /api/notes
 * @param {Object} req -  Request object of Express.
 * @param {Object}  res - Response object of Express. 
 * @param {Function} next - Function to next middelware. 
 */

const deleteNote=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const queryDetele=await db.query(NOTES_QUERIES.DELETE_NOTE,[id]);
        if(queryDetele.rowCount===0){
        return error(HTTP_STATUS.NOT_FOUND,NOTES_ERRORS.ID_NOT_FOUND,next);
        }
        successDelete(res,HTTP_STATUS.OK,queryDetele.rows[0])
    }catch(error){
        next(error);
    }
}


module.exports={
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}