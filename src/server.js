const express=require('express');
const app= express();
const notesController=require('./controllers/notesController');
const {validateNotePost,validateNotePut,validateId}=require('./middleware/validation');
const {errorHandler,error}=require('./middleware/errorHandlers');
const {MESSAGES_OPERATION,HTTP_STATUS,PORT}=require('./constants/httpStatusCode')

const options={
    host:'127.0.0.1',
    port:process.env.PORT||PORT
};

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({result:MESSAGES_OPERATION.SUCCESFUL_OPERATION})
});
// Obtener todas los registros de la ruta
app.get('/api/notes',notesController.getAllNotes)

//Obtener registros de la ruta mediante id
app.get('/api/notes/:id',validateId,notesController.getNoteById)

// Insertar registros en la ruta
app.post('/api/notes',validateNotePost,notesController.createNote)

// Actualizar registros en la ruta

app.put('/api/notes/:id',validateNotePut,validateId,notesController.updateNote)

//Borrar registro en base al id

app.delete('/api/notes/:id',validateId,notesController.deleteNote);

// Captura de error en la ruta

app.use((req,res,next)=>{
    error(HTTP_STATUS.NOT_FOUND,MESSAGES_OPERATION.URL_NO_FOUND(req.originalUrl),next);
})
// Manejo de error centralizado
app.use(errorHandler)

app.listen(options.port, ()=>{
    console.log('El servidor ya funca')
})
