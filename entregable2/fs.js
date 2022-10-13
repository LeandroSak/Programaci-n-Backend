const fs = require('fs')


class Contenedor {
    constructor() {

    }
    save(objeto) {
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = JSON.parse(data)
                const ultimo = produJason[produJason.length - 1]
                produJason.push({ title: objeto.title, price: objeto.price, id: ultimo.id + 1 })
                fs.writeFile("./productos.txt", JSON.stringify(produJason, null, 2), error => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        console.log("listo")
                    }
                })
            }
        })

    }
    getById(id) {
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = JSON.parse(data)
                console.log(produJason.find((element) => element.id === id))
            }
        })
    }
    getAll() {
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = JSON.parse(data)
                console.log(produJason)
            }
        })
    }
    deleteById(id) {
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = JSON.parse(data)
                produJason.splice(produJason.findIndex((element) => element.id === id),1)
                fs.writeFile("./productos.txt", JSON.stringify(produJason, null, 2), error => {
                    if (error) {
                        throw new Error(error)
                    } else {
                        console.log("listo producto eliminado")
                    }
                })
            }
        })
    }
    deletAll(){
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = []
                fs.writeFile("./productos.txt", JSON.stringify(produJason, null, 2), error => {
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
const contenedor1 = new Contenedor()
contenedor1.save({ title: "Regla", price: 123.12 })
contenedor1.getById(1)
contenedor1.getAll()
contenedor1.deleteById(10)
contenedor1.deletAll()