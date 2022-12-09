import fs from 'fs'

class Cart {
    constructor() {
    }
    async save(time) {
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await fs.promises.readFile(`./storage/carritos.json`)
            let cartJason = JSON.parse(data)
            if (cartJason.length != 0) {
                ultimo = cartJason[cartJason.length - 1]
                cartJason.push({ id: ultimo.id + 1, timestamp: time, productos: [] })
                showid = ultimo.id + 1
            } else {
                cartJason.push({ id: ultimo + 1, timestamp: time, productos: [] })
                showid = ultimo + 1
            }
            await fs.promises.writeFile("./storage/carritos.json", JSON.stringify(cartJason, null, 2))
            return showid
        } catch {
            console.error(error)
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/carritos.json`)
            let cartJason = JSON.parse(data)
            let cart = cartJason.find((element) => element.id == id)
            if (cart) {
                cartJason.splice(cartJason.findIndex((element) => element.id == cart.id), 1)
                await fs.promises.writeFile("./storage/carritos.json", JSON.stringify(cartJason, null, 2))
                return id
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/carritos.json`)
            let cartJason = JSON.parse(data)
            let cart = cartJason.find((element) => element.id == id)
            if (cart) {
                return cart
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }


    async putById(id, prop ) {
        try {

            let data = await fs.promises.readFile(`./storage/carritos.json`)
            data = JSON.parse(data)
            let cart = data.find((element) => element.id == id)
            if (cart) {
                let indexP = cart.productos.findIndex((element) => element.id == prop.id)
                if(indexP !=-1){
                    cart.productos[indexP].cantidad+=1
                    cart ={
                        ...cart,
                        productos:cart.productos
                    }
                }else{
                    prop={
                        ...prop,
                        cantidad : 1
                    }
                    cart = {
                        ...cart,
                        ...cart.productos.push(prop)
                    }}
                data = data.map(prod => {
                    if (prod.id == cart.id) {
                        prod = cart
                    }
                    return prod
                })
                data = JSON.stringify(data, null, 2)
                await fs.promises.writeFile(`./storage/carritos.json`, data)
                return cart
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProdById(id, prop) {
        try {
            let data = await fs.promises.readFile(`./storage/carritos.json`)
            data = JSON.parse(data)
            let cart = data.find((element) => element.id == id)
            if (cart) {
                let productos = cart.productos
                let product = productos.find((element) => element.id == prop)
                if (product) {
                    const producto = productos.filter((element) => element.id != prop)
                    cart = {
                        id: cart.id,
                        timestamp: cart.timestamp,
                        productos: producto
                    }

                    data = data.map(prod => {
                        if (prod.id == cart.id) {
                            prod = cart
                        }
                        return prod
                    })
                    data = JSON.stringify(data, null, 2)
                    await fs.promises.writeFile(`./storage/carritos.json`, data)
                    return cart
                } else {
                    return null
                }

            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllProd(id) {
        try {
            let data = await fs.promises.readFile(`./storage/carritos.json`)
            let cartJason = JSON.parse(data)
            let cart = cartJason.find((element) => element.id == id)
            if (cart) {

                return cart.productos
            } else {
                return null
            }
        } catch {
            console.error(error)
        }

    }
    async getAll() {
        let file = await fs.promises.readFile(`./storage/carritos.json`)
            .then(data => {
                let jsonData = JSON.parse(data)
                return jsonData
            })
            .catch(error => console.log(error))
        return file
    }
}



export default Cart