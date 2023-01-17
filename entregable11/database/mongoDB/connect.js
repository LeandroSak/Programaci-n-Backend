const mongoose = require('mongoose');
const {getMongoConfig} = require('./../../src/session-config')

const connectionMongo = async () => {
    const MONGO_URI = "mongodb+srv://admin:T4dFkHXFQi4khLef@proyectoecommerce.tndeuz1.mongodb.net/entregable?retryWrites=true&w=majority";
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI, getMongoConfig()).then(()=>{
        console.info("Conectado a Mongo")
    }).catch(err=>{
        console.error(err);
        process.exit();
    });
    
}

module.exports = connectionMongo;