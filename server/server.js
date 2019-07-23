const express = require('express');
const path = require('path');
// estamos requiriendo el paquete de socket.io
const socketIO = require('socket.io');
// estas requiriendo el paquete para poder usar el http,
const http = require('http');
const app = express();
// inicializamos el servidor pero con la varible app dentro de la funcion de createServer
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// estamos usando el middleware para que todo el mundo puede utilizar y accesar a la caperta publicque tiene un html con un titulo
app.use(express.static(publicPath));

// esto mantiene la comunicacion con el backend y el frontend
// me imagino que inicializa el socket.io
module.exports.io = socketIO(server);


require('./sockets/socket');


// aqui en vez de app es server.listen
server.listen(port, (err) => {

    if (err) {
        throw new Error(err);
    }
    console.log(`Servidor corriendo en puerto ${ port }`);
});