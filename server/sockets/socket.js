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

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoticket()
    });

});