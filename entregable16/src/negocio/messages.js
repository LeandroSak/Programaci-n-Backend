const fs = require('fs')
const { schema, normalize } = require('normalizr');
const {leer,guardar} = require("../persistencia/mensajes-persistemcia.js")


class Message {
    constructor() {

    }
    async save(objeto) {

        try {
            let data = await leer()
            let messageJason = JSON.parse(data)
            messageJason.mensajes.push({
                author: {
                    email: objeto.email,
                    nombre: objeto.nombre,
                    apellido: objeto.apellido,
                    edad: objeto.edad,
                    alias: objeto.alias,
                    
                },
                time: objeto.time,
                text: objeto.texto
            })
            await guardar(messageJason)
            return
        } catch {
            console.error(error)
        }
    }

    async getAll() {
        try {
            const data = await leer()
            let dataMensajes = JSON.parse(data)
            const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
            const schemaMensaje = new schema.Entity('mensajes', {
                mensajes: 
                    [{author:schemaAuthor}]
            })
            const dataNorm = normalize(dataMensajes, schemaMensaje);
            return dataNorm
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = Message