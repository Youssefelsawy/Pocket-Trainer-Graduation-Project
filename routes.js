const fs = require('fs');


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter a Message</title></head>');
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"> <button type="submit">Send</button> </form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunks) =>{
            body.push(chunks);
        });
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('Message.txt', message);
        });
        res.statusCode=302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>my first app</title></head>');
    res.write('<body>hellooooooooo</body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;

