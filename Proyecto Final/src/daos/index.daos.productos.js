import Contenedor from "./productos/contenedor.js"
import ContenedorFire from "./productos/contenedorFirebase.js"
import ContenedorMongo from "./productos/contenedorMongo.js"

class ProductClass {
    constructor(){
    const dataCore = process.env.DATACORE;
    if(dataCore == 'FIREBASE'){
        return  new ContenedorFire()
    }else if(dataCore == 'FS'){
        return  new Contenedor()
    }else if(dataCore == 'MONGO'){
        return  new ContenedorMongo()
    }
}}

export default ProductClass 