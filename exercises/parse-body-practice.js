const htpp = require('http');

// Normalizamos la ruta 
const parsedUrl = (req, basedUrl) => {
    let newUrl = new URL(req.url, basedUrl);
    let path = newUrl.pathname;
    if (newUrl.pathname.length > 1 && newUrl.pathname.endsWith('/')) {
        path = path.slice(0, -1);
    }
    return path;
};
const server = htpp.createServer((req, res) => {
    // Verificamos que la ruta y el método sean correctos
    const path = parsedUrl(req, `http://localhost:3000`);
    if (path!=='/test' || req.method!=='POST') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: '404 Punto no encontrado' }));
    }
    // Parseamos el body de la solicitud
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    res.setHeader('Content-Type', 'application/json');
    // Cuando se termina de recibir el body
    req.on('end', () => {
        try {
            // pareseamos el body y respondemos con el body parseado más dos propiedades nuevas
            const parsedBody = JSON.parse(body);
            parsedBody.processed = true;
            parsedBody.mensage = 'Cuerpo procesado correctamente';
            res.statusCode = 201;
            res.end(JSON.stringify({ parsedBody }));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Cuerpo de solicitud no válido' }));
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log(`Server running at http://localhost:3000/`);
});


