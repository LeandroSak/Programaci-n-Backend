import fs from 'fs'

class Contenedor {
    constructor() {

    }
    async save(objeto, time) {
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await fs.promises.readFile(`./storage/productos.json`)
            let produJason = JSON.parse(data)
            if (produJason.length != 0) {
                ultimo = produJason[produJason.length - 1]
                produJason.push({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: ultimo.id + 1 })
                showid = ultimo.id + 1
            } else {
                produJason.push({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: ultimo + 1 })
                showid = ultimo + 1
            }
            await fs.promises.writeFile("./storage/productos.json", JSON.stringify(produJason, null, 2))
            return showid
        } catch {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/productos.json`)
            let produJason = JSON.parse(data)
            let product = produJason.find((element) => element.id == id)
            if (product) {
                return product
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }
    async getAll() {
        let file = await fs.promises.readFile(`./storage/productos.json`)
            .then(data => {
                let jsonData = JSON.parse(data)
                return jsonData
            })
            .catch(error => console.log(error))
        return file
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/productos.json`)
            let produJason = JSON.parse(data)
            let product = produJason.find((element) => element.id == id)
            if (product) {
                produJason.splice(produJason.findIndex((element) => element.id == product.id), 1)
                await fs.promises.writeFile("./storage/productos.json", JSON.stringify(produJason, null, 2))
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
            let data = await fs.promises.readFile(`./storage/productos.json`)
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
                    return prod
                })
                data = JSON.stringify(data, null, 2)
                await fs.promises.writeFile(`./storage/productos.json`, data)
                return product
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    deletAll() {
        fs.readFile("./storage/productos.json", (error, data) => {
            if (error) {
                throw new Error(error)
            } else {
                let produJason = []
                fs.writeFile("./storage/productos.json", JSON.stringify(produJason, null, 2), error => {
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

export default Contenedor