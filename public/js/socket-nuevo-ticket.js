// comando para establecer la conexion 
var socket = io();
var label = $('#lblNuevoTicket');

// con esto estamos indicando cuando se conecta al servidor y lo manejamos con un callback  566678
socket.on('connect', function () {
    console.log('Conectado');
});

socket.on('estadoActual', function (resp) {
    label.text(resp.actual);
});

socket.on('disconnect', function () {
    console.log('Desconectado');
})

$('button').on('click', function () {
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
});