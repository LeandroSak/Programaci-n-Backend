import Cart from "../daos/carritos/Cart.js"
import CartFire from "../daos/carritos/CartFirebase.js"
import CartMongo from "../daos/carritos/CartMongo.js"

const getCartModule = ()=>{
    const dataCore = process.env.DATACORE;
    if(dataCore == 'FIREBASE'){
        return CartFire
    }else if(dataCore == 'FS'){
        return Cart
    }else if(dataCore == 'MONGO'){
        return CartMongo

    }
}

export const CartClass =  getCartModule();