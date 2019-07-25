var socket = io();
var label = $('small');

// de esta manera obtenemos los valores, de los url, en este caso es la variable escritorio
var searchParams = new URLSearchParams(window.location.search);
// estamos preguntando si viene escritorio por que puede que el usuario mande otra cosa que no sea la variable escritorio
if (!searchParams.has('escritorio')) {
    // aqui estamos haciendo que se cargue la pagina de index.html, por que nos dimos cuenta que en el url no venia el escritorio
    window.location = 'index.html';
    throw new Error('El escritorio');
}

// de esta manera estamos obteniendo el valor de la var escritorio
var escritorio = searchParams.get('escritorio');
console.log(searchParams.get('escritorio'));

// aqui le estamos diciendo jquery busca las etiquetas h1 y mandales el escritorio
$('h1').text(`Escritorio ${searchParams.get('escritorio')}`);

// aqui estamos atendiendo el siguiente ticket que esta en la cola
$('button').on('click', function () {
    socket.emit('atenderTikcet', {
        escritorio: escritorio
    }, function (resp) {
        if (resp === 'Ya no hay tickets') {
            alert('ya no hay mas ticket por atender');
            label.text('ya no hay mas ticket por atender');
            return;
        }
        label.text('Ticket: ' + resp.numero);
    });
});