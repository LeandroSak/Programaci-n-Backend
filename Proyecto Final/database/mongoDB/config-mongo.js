import mongoose from 'mongoose'

const connectionMongo = async () => {
    let MONGO_URI;
    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const DB_NAME = process.env.DB_NAME;
    const MONGO_QUERY = process.env.MONGO_QUERY;
    const MONGO_HOST = process.env.MONGO_HOST;

    if(MONGO_USER == null){
        MONGO_URI = `${process.env.MONGO_URI}/${DB_NAME}`;
    }else{
        MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${DB_NAME}?${MONGO_QUERY}`
    }
    
    const MONGOOSE_CONFIG = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    await mongoose.connect(MONGO_URI, MONGOOSE_CONFIG);
    console.info("Conectado a Mongo")


}

export default connectionMongo;