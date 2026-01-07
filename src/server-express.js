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

app.use((err,req,res,next)=>{
    const status=err.status||500;
    res.status(status).json({
        success:false,
        message:err.message||'Algo se murió we',
        code:'INTERNAL_ERROR'
    })
})
app.listen(options.port, ()=>{
    console.log('Servidor Iniciado')
})
