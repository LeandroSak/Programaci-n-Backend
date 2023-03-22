const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');
const mongoConnect = require ('./database/mongoDB/connect')
const {getStoreConfig} = require('./src/session-config')
const indexRoutes = require('./src/routes/index-routes')
const logger = require("./src/logger/logger.js")

require('dotenv').config();

const cont = require("./src/negocio/contenedor")
const contenedor = new cont()

const mess = require("./src/negocio/messages")
const messa = new mess()

const app = express();
const http = new HttpServer(app)
const io = new IoServer(http)

const compression = require("compression");
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.set('view engine', 'ejs');
mongoConnect();

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: 'secreto',
    cookie:{
        maxAge: 10 * 60 * 1000
    }   ,
    resave: true,
    saveUninitialized: true
}))

const initPassport = require("./src/passport/passport-config.js")
const passport = require('passport')
initPassport();

app.use(passport.initialize());
app.use(passport.session());



app.use(indexRoutes);


io.on('connection', async (socket) => {
    const products = await contenedor.getAll();
    const messages = await messa.getAll();
    logger.log("info", "Nuevo cliente conectado")
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