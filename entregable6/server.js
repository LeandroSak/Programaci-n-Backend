const app = require("./app")

const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
const http = new HttpServer(app)
const io = new IoServer(http)
const messages = [];
const products = [];


const PORT = process.env.PORT || 4000
app.set('port', PORT)

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`))

io.on('connection', (socket) =>{
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_DATA', messages, products)
    socket.on('NEW_MESSAGE_TO_SERVER', data => {
        messages.push(data);
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER',data);
    })
    socket.on('NEW_PRODUCT_TO_SERVER',data =>{
        products.push(data);
        io.sockets.emit('NEW_PRODUCT_FROM_SERVER',data);
    })

})