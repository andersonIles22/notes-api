const http=require('http');

const server=http.createServer((req,res)=>{
    const basedUrl=`http://${req.headers.host}`;
    const parsedUrl=new URL(req.url,basedUrl);
    let path=parsedUrl.pathname;
    if (parsedUrl.pathname.length > 1 && parsedUrl.pathname.endsWith('/')) {
        path=path.slice(0, -1);
    }
    res.setHeader('Content-Type','application/json');
    if(path==='/' && req.method==='GET'){
        res.statusCode=200;
        res.end(JSON.stringify({message:'API is running!'}));
    }
    else if(path==='/api/notes' && req.method==='GET'){
        res.statusCode=200;
        res.end(JSON.stringify({message:'List notes endpoint'}));
    }
    else if(path==='/api/notes' && req.method==='POST'){
        res.statusCode=201;
        res.end(JSON.stringify({message:'Create note endpoint'}));
    }
    else{
        res.statusCode=404;
        res.end(JSON.stringify({message:'404 Not Found'}));
    }
});
const PORT=3000;
const HOST='localhost';

server.listen(PORT,HOST,()=>{
    console.log(`Server running at http://${HOST}:${PORT}/`);
});