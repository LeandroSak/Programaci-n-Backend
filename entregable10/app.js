const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');
require('dotenv').config();

const cont = require("./storage/contenedor")
const contenedor = new cont()

const mess = require("./storage/messages")
const messa = new mess()

const mockTest = require("./storage/faker")
const mock = new mockTest()

const app = express();
const http = new HttpServer(app)
const io = new IoServer(http)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.set('view engine', 'ejs');

const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const storeConfig = {
    mongoUrl: 'mongodb+srv://admin:XrDYQQh1QZZ7fF8V@proyectoecommerce.tndeuz1.mongodb.net/session?retryWrites=true&w=majority',
    mongoOptions: mongoConfig
}
app.use(session({
    store: MongoStore.create(storeConfig),
    secret: 'secreto',
    cookie:{
        maxAge: 10 * 60 * 1000
    }   ,
    resave: true,
    saveUninitialized: true
}))

const indexRoutes = require('./src/routes/index-routes')

app.use(indexRoutes);


io.on('connection', async (socket) => {
    const products = await contenedor.getAll();
    const messages = await messa.getAll();
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_MESSAGE_DATA', messages)
    socket.emit('UPDATE_PRODUCTS_DATA', products)
    socket.on('NEW_MESSAGE_TO_SERVER', async data => {
        await messa.save(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
    })
    socket.on('NEW_PRODUCT_TO_SERVER', async data => {
        await contenedor.save(data)
        io.sockets.emit('NEW_PRODUCT_FROM_SERVER', data);
    })

})

module.exports = http;