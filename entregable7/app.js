const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
require('dotenv').config();

const cont = require("./storage/contenedor")
const contenedor = new cont()

const mess = require("./storage/messages")
const messa = new mess()

const app = express();
const http = new HttpServer(app)
const io = new IoServer(http)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', async(_req, res) => {
    res.render('pages/index', { root: __dirname });
})

io.on('connection', async (socket) =>{
    const products = await contenedor.getAll();
    const messages = await messa.getAll();
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_MESSAGE_DATA', messages)
    socket.emit('UPDATE_PRODUCTS_DATA', products)
    socket.on('NEW_MESSAGE_TO_SERVER', async data => {
        await messa.save(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER',data);
    })
    socket.on('NEW_PRODUCT_TO_SERVER',async data =>{
        await contenedor.save(data)
        io.sockets.emit('NEW_PRODUCT_FROM_SERVER',data);
    })

})

module.exports = http ;