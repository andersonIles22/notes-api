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
    return errorResponse(res,404,'404 Endpoint not found');
});

server.listen(options.PORT,options.HOST,()=>{
    console.log(`Server running at http://${options.HOST}:${options.PORT}/`);
});


