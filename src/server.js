const express=require('express');
const app= express();
const notesRoutes=require('./routes/noteRoutes')
const {errorHandler,error}=require('./middleware/errorHandlers');
const {HTTP_STATUS}=require('./constants/httpStatusCode');
const {MESSAGES_OPERATION}=require('./constants/messages')
const options={
    host:'127.0.0.1',
    port:process.env.PORT||3000
};

app.use(express.json())
// Obtener un mensaje al hacer GET en el host sin ruta
app.get('/',(req,res)=>{
    res.json({result:MESSAGES_OPERATION.SUCCESFUL_OPERATION})
});

// Requests to /api/notes
app.use('/api/notes',notesRoutes)

// Manejo de error, cuando hace request a rutas no establecidas
app.use((req,res,next)=>{
    error(HTTP_STATUS.NOT_FOUND,MESSAGES_OPERATION.URL_NO_FOUND(req.originalUrl),next);
})

// Manejo de error centralizado
app.use(errorHandler)

app.listen(options.port, ()=>{
    console.log('El servidor ya funca')
})
