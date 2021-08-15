const http = require('http');
const { MessageController } = require('./controllers/MessageController');

const messageController = new MessageController();

const server = http.createServer(async (request, response) => {
    if (request.url.match(/\/messages\?username=[a-zA-Z0-9_]+/) && request.method === 'GET') {
        const username = request.url.split('=')[1]
        await messageController.index(request, response, username);
    } else if (request.url.match(/\/messages\/[a-zA-Z0-9_-]+/) && request.method === 'GET') {
        const id = request.url.split('/')[2]
        await messageController.show(request, response, id);
    } else if (request.url.match(/\/messages\/[a-zA-Z0-9_-]+/) && request.method === 'DELETE') {
        const id = request.url.split('/')[2]
        await messageController.destroy(request, response, id);
    } else if (request.url.match(/\/messages\/[a-zA-Z0-9_-]+/) && request.method === 'PUT') {
        const id = request.url.split('/')[2]
        await messageController.update(request, response, id);
    } else if (request.url === '/message' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ ok: true }));
    } else if (request.url === '/message' && request.method === 'POST') {
        await messageController.create(request, response);
    }
});

server.listen(3333, () => console.log('server is running on http://localhost:3333'));