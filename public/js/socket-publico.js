var socket = io();

socket.on('estadoActual', function (resp) {
    // aqui estamos obtneniendo un arreglo que viene en el resp. y lo estamos iterando con el foreach,
    // el foreach nos sirve para navegar un arreglo de objetos 
    actualizaEstado(resp.ultimosCuatros);
    console.log('Todo esta actualizado');
});

socket.on('ultimos4', function (resp) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaEstado(resp.ultimosCuatros);
});


function actualizaEstado(ultimosCuatros) {

    ultimosCuatros.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text('Ticket' + element.numero);
        $(`#lblEscritorio${index+1}`).text(`Escritorio` + element.escritorio);
    });
}