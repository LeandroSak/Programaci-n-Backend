const fs = require('fs')
const {leer,guardar} = require("../persistencia/contenedor-persistencia.js")
const productoDTO = require('../dto/productoDTO')

class Contenedor {
    constructor() {

    }
    async save(objeto) {

        try {
            let data = await leer()
            let produJason = JSON.parse(data)
            const ultimo = produJason[produJason.length - 1]
            produJason.push({ title: objeto.title, price: objeto.price, id: ultimo.id + 1, url: objeto.url })
            await guardar(produJason)
            return produJason
        } catch {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            let data = await leer()
            let produJason = JSON.parse(data)
            let product = produJason.find((element) => element.id == id)
            if (product) {
                const productodto = new productoDTO(product)
                return productodto
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }
    async getAll() {
        let file = await leer()
            .then(data => {
                let jsonData = JSON.parse(data)
                return jsonData
            })
            .catch(error => console.log(error))
        return file
    }

    async deleteById(id) {
        try {
            let data = await leer()
            let produJason = JSON.parse(data)
            let product = produJason.find((element) => element.id == id)
            if (product) {
                produJason.splice(produJason.findIndex((element) => element.id == product.id), 1)
                await guardar(produJason)
                return id
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async putById(id, prop) {
        try {
            let data = await leer()
            data = JSON.parse(data)
            let product = data.find((element) => element.id == id)
            if (product) {
                product = {
                    ...product,
                    ...prop
                }
                data = data.map(prod => {
                    if (prod.id == product.id) {
                        prod = product
                    }
                    const productodto = new productoDTO(prod)
                return productodto
                })
                
                await guardar(data)
                const productodto = new productoDTO(product)
                return productodto
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    deletAll() {
        fs.readFile("./storage/productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = []
                fs.writeFile("./storage/productos.txt", JSON.stringify(produJason, null, 2), error => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        console.log("listo productos eliminados")
                    }
                })
            }
        })
    }
}

module.exports = Contenedor