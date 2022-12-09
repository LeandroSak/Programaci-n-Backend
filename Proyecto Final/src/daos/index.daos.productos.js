import dotenv from 'dotenv'
dotenv.config()
import Contenedor from "./productos/contenedor.js"
import ContenedorFire from "./productos/contenedorFirebase.js"
import ContenedorMongo from "./productos/contenedorMongo.js"

const getProductModule = ()=>{
    const dataCore = process.env.DATACORE;
    if(dataCore == 'FIREBASE'){
        return ContenedorFire
    }else if(dataCore == 'FS'){
        return Contenedor
    }else if(dataCore == 'MONGO'){
        return ContenedorMongo
    }
}

export const ProductClass =  getProductModule();