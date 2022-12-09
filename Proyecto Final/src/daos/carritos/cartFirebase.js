import admin from'firebase-admin'
import { FieldValue } from'firebase-admin/firestore';

class Cart {
    constructor() {
    }
    async save(time) {
        const db = admin.firestore();
        const dbFire = db.collection('carritos');
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await dbFire.get();
            if (data.docs.length != 0) {
                ultimo = data.docs[data.docs.length - 1].data()
                let idd = ultimo.id + 1;
                let doc = dbFire.doc(`${idd}`);
                await doc.create({ id: ultimo.id + 1, timestamp: time, productos: [] })
                showid = ultimo.id + 1
            } else {
                let doc = dbFire.doc(`${ultimo + 1}`);
                await doc.create({ id: ultimo + 1, timestamp: time, productos: [] })
                showid = ultimo + 1
            }
            return showid
        } catch {
            console.error(error)
        }
    }

    async deleteById(id) {
        try {
            const db = admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.doc(`${id}`);
            let item = await data.get();
            if (item) {
                await data.delete()
                return id
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            const db = admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.doc(`${id}`);
            let item = await data.get();
            if (item) {
                return item.data()
            } else {
                return null
            }
        } catch {
            console.error(error)
        }

    }


    async putById(id, prop) {
        try {

            const db = admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.doc(`${id}`);
            let item = await data.get();
            if (item) {
                let prods = item.data().productos
                let indexP = prods.findIndex((element) => element.id == prop.id)
                if (indexP != -1) {
                    let cantidadT = item.data().productos[indexP].cantidad
                    let prod = {
                        title: prop.title,
                        price: prop.price,
                        timestamp: prop.timestamp,
                        url: prop.url,
                        description: prop.description,
                        stock: prop.stock,
                        id: prop.id,
                        cantidad: cantidadT + 1
                    }
                    await data.update({
                        productos: FieldValue.arrayRemove(item.data().productos[indexP])
                    });
                    await data.update({
                        productos: FieldValue.arrayUnion(prod)
                    });
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
                    await data.update({
                        productos: FieldValue.arrayUnion(prod)
                    });
                }
                item = await data.get();
                return item.data()
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProdById(id, prop) {
        try {
            const db = admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.doc(`${id}`);
            let item = await data.get();
            if (item) {
                let prods = item.data().productos
                let indexP = prods.findIndex((element) => element.id == prop)
                if (indexP != -1) {
                    await data.update({
                        productos: FieldValue.arrayRemove(item.data().productos[indexP])
                    });
                    item = await data.get();
                    return item.data();
                } else {
                    return null
                }

            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllProd(numberID) {
        try {
            const db = admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.doc(`${numberID}`);
            let item = await data.get();
            if (item.data() != undefined) {
                return item.data().productos
            } else {
                return null
            }
        } catch {
            console.error(error)
        }

    }

    async getAll() {
        try {
            const db= admin.firestore();
            const dbFire = db.collection('carritos');
            let data = await dbFire.get();
            let carritos = [];
            data.docs.forEach(doc =>{
                carritos.push(doc.data())
              });
            if (data) {
                return carritos
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }
}



export default Cart