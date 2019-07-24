var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location;
    throw new Error('El escritorio');
}

var escritorio = searchParams.get('escritorio');
console.log(searchParams.get('escritorio'));

$('h1').text(`Escritorio ${searchParams.get('escritorio')}`);


$('button').on('click', function () {
    socket.emit('atenderTikcet', {
        escritorio: escritorio
    }, function (resp) {

        console.log(resp);
    });
});