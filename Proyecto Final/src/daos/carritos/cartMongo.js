import cartModel from '../../../database/mongoDB/models/cart.model.js';


class Cart {
    constructor() {
    }
    async save(time) {
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await cartModel.find({});
            if (data.length != 0) {
                ultimo = data[data.length - 1]
                
                await cartModel.insertMany({ id: ultimo.id + 1, timestamp: time, productos: [] })
                showid = ultimo.id + 1
                
            } else {
                await cartModel.insertMany({ id: ultimo + 1, timestamp: time, productos: [] })
                showid = ultimo + 1
            }

            return showid
        } catch {
            console.error(error)
        }
    }

    async deleteById(numberID) {
        try {
            let data = await cartModel.find({ id: numberID });
            if (data) {
                await cartModel.deleteOne({ id: numberID })
                return numberID
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async getById(numberID) {
        try {
            let data = await cartModel.find({ id: numberID });
            if (data) {
                return data[0]
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }


    async putById(numberID, prop) {
        try {

            let data = await cartModel.find({ id: numberID });
            
            if (data) {
                let indexP = data[0].productos.findIndex((element) => element.id == prop.id)
                if (indexP != -1) {
                    const totalcant = data[0].productos[indexP].cantidad
                    await cartModel.updateOne({ id: numberID }, { $set: { "productos.$[prod].cantidad": totalcant + 1 } }, { arrayFilters: [{ "prod.id": prop.id }] })
                } else {
                    let prod = {
                        title: prop.title,
                        price: prop.price,
                        timestamp: prop.timestamp,
                        url: prop.url,
                        description: prop.description,
                        stock: prop.stock,
                        id: prop.id,
                        cantidad: 1
                    }
                    await cartModel.updateOne({ id: numberID }, {$addToSet:{"productos":prod}})
                }
                data = await cartModel.find({ id: numberID });
                return data[0]
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProdById(numberID, prodID) {
        try {
            let data = await cartModel.find({ id: numberID,"productos.id":prodID });
            if (data[0] != undefined) {
                await cartModel.updateOne({id:numberID}, {$pull:{"productos":{"id":prodID}}},{multi:true})
                data = await cartModel.find({ id: numberID });
                return data[0]
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllProd(numberID) {
        try {
            let data = await cartModel.find({ id: numberID });
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
            let data = await cartModel.find();
            if (data) {
                return data
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }
}



export default Cart