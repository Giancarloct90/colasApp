const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    // El constructor es lo primero que se ejecuta cuando escribimos el new
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatros = [];
        // aqui estamos pasando el archivo json a la var data
        let data = require('../data/data.json');
        console.log(data);

        // por si se reinicia el servidor o no tenemos acceso al servidor, 
        // cuando volvamos a conectarnos al server evaluamos si el dia.  
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatros = data.ultimosCuatros;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        // aqui estamos guardando el nuevo ticket en una instancia de un objeto de tipo Tikcets
        // para luego meeterlo al arreglo de tikcets que tenemos, para despues ser guardado en el sistema de archivos
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoticket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatros() {
        return this.ultimosCuatros;
    }

    atenderTicket(escritorio) {

        // si ya no hay mas tickets se acabo el asunto
        if (this.tickets.length === 0) {
            return `Ya no hay tickets`;
        }

        let numeroTicket = this.tickets[0].numero;

        // elimino la primera posicion del arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // agerga el tikcet al inicio del arreglo
        this.ultimosCuatros.unshift(atenderTicket);

        // con este codigo se borrar
        if (this.ultimosCuatros.length > 4) {
            this.ultimosCuatros.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimosCuatros);
        this.grabarArchivo();
        return atenderTicket;

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatros: this.ultimosCuatros
        }
        // con el stringify pasamos de json a un string, y luego lo escribimos en el sistema de archivo
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    // con esta funcion reiniciamos los contadores y los guardamos en el archivo json
    reiniciarConteo() {
        // creamos un objeto, con los valores de ultimo y hoy
        this.ultimo = 0;
        this.grabarArchivo();
        // aqui estamos reiniciando el conteo de los ticket emitidos
        this.tickets = [];
        this.ultimosCuatros = [];
    }
}

module.exports = {
    TicketControl
}