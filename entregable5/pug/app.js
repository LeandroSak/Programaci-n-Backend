const express = require('express');
require('dotenv').config();

const cont = require("./storage/contenedor")
const contenedor = new cont()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (_req, res) => {
    res.render('index');
})

app.post('/productos', async (req, res) => {
    try {
        await contenedor.save(req.body)
        res.status(200).redirect('/')
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})

app.get('/productos', async (_req, res) => {
    try {
        const products = await contenedor.getAll()
        res.render('productos', { listProducts: products, listExist: true })
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})

module.exports = app;