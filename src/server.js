const express=require('express');
const app= express();
const notesController=require('./controllers/notesController');
const {validateNotePost,validateNotePut,validateId}=require('./middleware/validation');
const {errorHandler,error}=require('./middleware/errorHandlers');

const options={
    host:'127.0.0.1',
    port:process.env.PORT||3000
};

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({result:'waos'})
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
    error(404,`Ruta ${req.originalUrl} no encontrada, pelele`,next);
})
// Manejo de error centralizado
app.use(errorHandler)

app.listen(options.port, ()=>{
    console.log('El servidor ya funca')
})
