import cartModel from '../../../database/mongoDB/models/cart.model.js';
import transporter from '../../email/adminEmail.js';
import Sms from '../../sms/sms.js';
const sms = new Sms();
import logger from '../../logger/logger.js';

class Cart {
    constructor() {
    }
    async save(time, userId) {
        let ultimo = 0;
        let showid = 0;
        let data
        try {
            let data = await cartModel.find({});
            if (data.length != 0) {
                ultimo = data[data.length - 1]

                data = await cartModel.insertMany({ id: ultimo.id + 1, timestamp: time, status: "open", userID: userId, productos: [] })
                showid = ultimo.id + 1

            } else {
                data = await cartModel.insertMany({ id: ultimo + 1, timestamp: time, status: "open", userID: userId, productos: [] })
                showid = ultimo + 1
            }

            return data[0]
        } catch (error){
            logger.log("error", error.message);
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

        } catch(error){
            logger.log("error", error.message);
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
        } catch(error) {
            logger.log("error", error.message);
        }
    }

    async getByIdAndUser(numberID) {
        try {
            let cart = await cartModel.find({ userID: numberID });

            let data
            if (cart.length != 0) {
                data = cart[cart.length - 1]
            } else {
                data = cart
            }

            if (data) {
                if (data.status == "open") {
                    return data
                } else {
                    return null
                }
            } else {
                return null
            }
        } catch(error) {
            logger.log("error", error.message);
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
                    await cartModel.updateOne({ id: numberID }, { $addToSet: { "productos": prod } })
                }
                data = await cartModel.find({ id: numberID });
                return data[0]
            } else {
                return null
            }
        } catch (error) {
            logger.log("error", error.message);
        }
    }

    async deleteProdById(numberID, prodID) {
        try {
            let data = await cartModel.find({ id: numberID, "productos.id": prodID });
            if (data[0] != undefined) {
                await cartModel.updateOne({ id: numberID }, { $pull: { "productos": { "id": prodID } } }, { multi: true })
                data = await cartModel.find({ id: numberID });
                return data[0]
            } else {
                return null
            }
        } catch (error) {
            logger.log("error", error.message);
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
        } catch(error) {
            logger.log("error", error.message);
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
        } catch(error) {
            logger.log("error", error.message);
        }
    }

    async putByIdCompra(numberID, userData) {
        try {

            let data = await cartModel.find({ id: numberID });
            if (data) {
                await cartModel.updateOne({ id: numberID }, { $set: { "status": "close" } })
                let total = "";
                for (let i = 0; i < data[0].productos.length; i++) {
                    total += `<li>${data[0].productos[i].title} cantidad: ${data[0].productos[i].cantidad}</li>`;
                }
                const mailOptions = {
                    from: 'Servidor Node.js',
                    to: process.env.ADMIN_EMAIL,
                    subject: 'Nueva compra',
                    html: `<h1>Nuevo compra</h1><br><p>Nombre: ${userData.name}</p><p>Email: ${userData.username}</p><p>Direccion: ${userData.adress}</p><p>Edad: ${userData.age}</p><p>Telefono: ${userData.phone}</p><p>Productos: </p><ul>${total}</ul>`
                }
                await transporter.sendMail(mailOptions);
                sms.enviarMensaje(userData.phone);
                sms.enviarWhatsapp(userData, data);
                return data
            } else {
                return null
            }
        } catch (error) {
            logger.log("error", error.message);
        }
    }

}





export default Cart