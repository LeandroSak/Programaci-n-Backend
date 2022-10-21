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
    async getAll() {
        let file = await fs.promises.readFile(`./productos.txt`, 'utf-8')
            .then(data => {
                let jsonData = JSON.parse(data)
                return jsonData
            })
            .catch(error => console.log(error))
        return file
    }
    deleteById(id) {
        fs.readFile("./productos.txt", "utf-8", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = JSON.parse(data)
                produJason.splice(produJason.findIndex((element) => element.id === id), 1)
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
    deletAll() {
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

module.exports=Contenedor