import mongoose from 'mongoose'
import logger from '../../src/logger/logger.js'

const getMongoConfig = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}
const connectionMongo = async () => {
    const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.DB_NAME}?${process.env.MONGO_QUERY}`;
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URI, getMongoConfig()).then(()=>{
        logger.log("info", "conectado a mongo");
    }).catch(error=>{
        logger.log("error", error.message);
        process.exit();
    });
    
}

export default connectionMongo;