const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
});

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // Algunos navegadores requieren explícitamente que se especifique el código de estado de éxito
};

app.use(cors(corsOptions));

// Ruta de ejemplo para servir la página web
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Evento de conexión de WebSocket
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Evento de mensaje recibido
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);

        // Enviar un mensaje al cliente
        socket.emit('respuesta', 'Hola desde el servidor');
    });

    // Evento de desconexión de WebSocket
    socket.on('disconnect', () => {
        console.log('El cliente se ha desconectado');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor Express con WebSockets escuchando en http://localhost:${port}/`);
});
