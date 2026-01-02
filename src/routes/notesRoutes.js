const controllers=require('../controllers/notesController')
const {errorResponse}=require('../utils/response')
async function handleNotesRoutes(req,res,method,pathParts){
    // Evita que /api/notes// pase como un GET ALL
    if (req.url.includes('//')) {
        return errorResponse(res, 400, "URL malformada");
    }
    // Validación  de que la ruta solo se limite a /api/notes  o  /api/notes/:id
    if (pathParts.length > 3) {
        return errorResponse(res, 404, "Ruta no encontrada");
    }

    //           Lógica de Enrutamiento
    if(method==='GET'&&pathParts.length===2){
       return await controllers.getALLNotes(req,res)
    }
    if(method==='GET'&&pathParts.length===3){
       return await controllers.getNoteById(res,pathParts)
    }
    if(method==='POST'&&pathParts.length===2){
        return await controllers.createNote(req,res,pathParts)
    }
    if(method==='PUT'&&pathParts.length===3){
        return await controllers.updateNote(req,res,pathParts)
    }
    if(method==='DELETE'&&pathParts.length===3){
        return await controllers.deleteNote(res,pathParts)
    }
    //  Por si los metodos no son validos
    return errorResponse(res,404, "Acción no permitida");

}
module.exports={
    handleNotesRoutes
}