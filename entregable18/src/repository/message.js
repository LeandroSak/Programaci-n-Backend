
export default class Message{
    #author;
    #time;
    #text;

    constructor({nombre, apellido, email,edad, alias,texto,time }){
        this.author={
            nombre,
            apellido,
            email,
            edad,
            alias
        },
        this.time = time,
        this.text = texto
    }

    get author() {
        return this.#author
    }

    set author({nombre, apellido, email,edad, alias}){
        if(!nombre) throw new Error ("nombre es un campo requerido");
        if(!apellido) throw new Error ("appelido es un campo requerido");
        if(!email) throw new Error ("email es un campo requerido");
        if(!edad) throw new Error ("edad es un campo requerido");
        if(!alias) throw new Error ("alias es un campo requerido");
        this.#author = {
            nombre,
            apellido,
            email,
            edad,
            alias
        }
    }

    get time(){
        return this.#time
    }

    set time(time){
        if(!time) throw new Error ("tiempo es un campo requerido");
        this.#time = time
    }

    get text(){
        return this.#text
    }

    set text(texto){
        if(!texto) throw new Error ("mensaje es un campo requerido");
        this.#text = texto
    }
}