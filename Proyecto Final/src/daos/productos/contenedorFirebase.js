import admin from'firebase-admin'

class ContenedorFire {
    constructor() {

    }
    async save(objeto, time) {
        const db= admin.firestore();
        const dbFire = db.collection('productos');
        let ultimo = 0;
        let showid = 0;
        try {
            let data = await dbFire.get();
            
            if (data.docs.length != 0) {
                ultimo = data.docs[data.docs.length - 1].data()
                let idd = ultimo.id+1;
                let doc = dbFire.doc(`${idd}`);
                await doc.create({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: idd })
                showid = ultimo.id + 1
            } else {
                let doc = dbFire.doc(`${ultimo+1}`);
                await doc.create({ title: objeto.title, price: objeto.price,timestamp:time, url:objeto.url,description: objeto.description, stock:objeto.stock, id: ultimo + 1 })
                showid = ultimo + 1
            }
            return showid
        } catch {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            const db= admin.firestore();
            const dbFire = db.collection('productos');
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
    async getAll() {
        try {
            const db= admin.firestore();
            const dbFire = db.collection('productos');
            let data = await dbFire.get();
            let productos = []
            data.docs.forEach(doc =>{
                productos.push(doc.data())
              });
            if (productos) {
                return productos
            } else {
                return null
            }
        } catch (error){
            console.error(error)
        }
    }

    async deleteById(id) {
        try {
            const db= admin.firestore();
            const dbFire = db.collection('productos');
            let data = await dbFire.doc(`${id}`);
            let product = await data.get();
            if (product.data() != undefined) {
                await data.delete()
                return id
            } else {
                return null
            }

        } catch {
            console.error(error)
        }
    }

    async putById(id, prop) {
        try {
            const db= admin.firestore();
            const dbFire = db.collection('productos');
            let data = await dbFire.doc(`${id}`);
            let product = await data.get();
            if (product.data() != undefined) {
                await data.update(prop)
                product = await data.get();
                return product.data()
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    
}

export default ContenedorFire