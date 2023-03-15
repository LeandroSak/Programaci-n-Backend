import twilio from 'twilio';
import logger from '../logger/logger.js';

class Sms {
    constructor() {

    }
    async enviarMensaje(phone) {
        const count = process.env.SMS_COUNT;
        const authToken = process.env.SMS_TOKEN;

        const client = twilio(count, authToken)
        try {
            const message = await client.messages.create({
                body: 'Su pedido a sido recibido y se encuentra en proceso',
                from: '+15074287080',
                to: phone
            })
            logger.log("info")
        } catch (error) {
            logger.log("error", error.message);
        }
    }

    async enviarWhatsapp(userData, data) {
        const count = process.env.SMS_COUNT;
        const authToken = process.env.SMS_TOKEN;

        const client = twilio(count, authToken)
        let total = ""
        for (let i = 0; i < data[0].productos.length; i++) {
            total += `producto: ${data[0].productos[i].title} cantidad: ${data[0].productos[i].cantidad}, `;
        }
        try {
            const message = await client.messages.create({

                body:`Nueva Compra de ${userData.name}, email: ${userData.username}, telefono: ${userData.phone}, de los productos: ${total}`,
                from: 'whatsapp:+14155238886',
                to: process.env.ADMIN_PHONE
            })
            logger.log("info")
        } catch (error) {
            logger.log("error", error.message);
        }
    }
}

export default Sms




