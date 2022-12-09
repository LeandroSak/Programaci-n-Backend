import productsModel from '../../../database/mongoDB/models/products.model.js';


class Contenedor {
    constructor() {

    }
    async save(objeto, time) {
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await productsModel.find();
           
            if (data != 0) {
                ultimo = data[data.length - 1]
                await productsModel.insertMany({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: ultimo.id + 1 });
                showid = ultimo.id + 1
            } else {
                await productsModel.insertMany({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: ultimo + 1 })
                showid = ultimo + 1
            }
           
            return showid
        } catch {
            console.error(err)
        }
    }

    async getById(numberID) {
        try {
            let data = await productsModel.find({id:numberID});
            if (data) {
                return data[0]
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }
    async getAll() {
        try {
            let data = await productsModel.find();
            if (data) {
                return data
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }

    async deleteById(numberID) {
        try {
            let data = await productsModel.find({id:numberID});
            if (data) {
                await productsModel.deleteOne({id:numberID})
                return numberID
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async putById(numberID, prop) {
        try {
            let product = await productsModel.find({id:numberID});
            
            
            if (product) {
                product = {
                    ...product,
                    ...prop
                }
                await productsModel.updateOne({id:numberID},{$set:{title: product.title, price: product.price,timestamp:product.time, url:product.url,description: product.description, stock:product.stock, id: product.id}});
                product = await productsModel.find({id:numberID});
                return product[0]
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deletAll() {
        try {
            let data = await productsModel.find({id:numberID});
            if (data) {
                productsModel.deleteMany({})
                return console.log("listo productos eliminados")
            } else {
                return console.log("no hay productos en la base de datos")
            }
        } catch {
            console.error(error)
        }
    }
}

export default Contenedor