const express=require('express');
const app= express();
const notesController=require('./controllers/notesController');
const options={
    host:'127.0.0.1',
    port:process.env.PORT||3000
};


app.use(express.json())

app.get('/',(req,res)=>{
    res.json({result:'waos'})
});
// Obtener todas los registros de la ruta
app.get('/api/notes',(req, res,next)=>{
    notesController.getAllNotes(req,res,next);
});

//Obtener registros de la ruta mediante id
app.get('/api/notes/:id',(req,res,next)=>{
    notesController.getNoteById(req,res,next);
})

// Insertar registros en la ruta
app.post('/api/notes',(req,res,next)=>{
    notesController.createNote(req,res,next);
});

// Actualizar registros en la ruta

app.put('/api/notes/:id',(req,res,next)=>{
    notesController.updateNote(req,res,next);
})

//Borrar registro en base al id

app.delete('/api/notes/:id',(req,res,next)=>{
    notesController.deleteNote(req,res,next);
})

// Captura de error en la ruta

app.use((req,res,next)=>{
    const error=new Error(`Ruta ${req.originalUrl} no encontrada, este wey`);
    error.stack=404;
    next(error);
})
// Manejo de error centralizado
app.use((err,req,res,next)=>{
    const status=err.status||500;
    res.status(status).json({
        success:false,
        message:err.message||'Bip, algo esta mal we',
        code:'INTERNAL_ERROR'
    })
})
app.listen(options.port, ()=>{
    console.log('El servidor ya funca')
})
