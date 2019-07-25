const {
    io
} = require('../server');

// aqui estamos importando la clase para poder instanciar objetos de este clase y poderla usar
const {
    TicketControl
} = require('../classes/ticket-control');

const ticketControl = new TicketControl();
let tikcet = 0;
// con este comando sabremos cuando se conecta un usuario
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);

    });

    // estamos enviando un msj, lo que estamos enviando es un objeto con el resultado del getUltimotikcet
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoticket(),
        ultimosCuatros: ticketControl.getUltimosCuatros()
    });

    // Estamos estableciendo una escucha, cuando en el frontend emita un mensaje se ejecutara esto
    // ejecutamos un callback y le enviamos el resultado de atenderTikcet
    client.on('atenderTikcet', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atender = ticketControl.atenderTicket(data.escritorio);
        callback(atender);

        client.broadcast.emit('ultimos4', {
            ultimosCuatros: ticketControl.getUltimosCuatros()
        });
    });
});