const express = require('express');
require('dotenv').config();

const cont = require("./storage/contenedor")
const contenedor = new cont()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', async(_req, res) => {
    
    res.render('pages/index', { root: __dirname });
    
})

app.post('/productos', async (req, res) => {
    try {
        await contenedor.save(req.body)
        res.redirect('/')
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
        res.render('pages/productos', { listProducts: products, listExist: true })
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})

module.exports = app ;