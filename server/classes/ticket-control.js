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
        // aqui estamos pasando el archivo json a la var data
        let data = require('../data/data.json');
        console.log(data);

        // por si se reinicia el servidor o no tenemos acceso al servidor, 
        // cuando volvamos a conectarnos al server evaluamos si el dia.  
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoticket() {
        return `Ticket ${this.ultimo}`;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
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
        this.tickets = [];
    }
}

module.exports = {
    TicketControl
}