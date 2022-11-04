const express = require('express');
require('dotenv').config();
const { create } = require('express-handlebars');
const cont = require("./storage/contenedor")
const contenedor = new cont()

const app = express();

const hbs = create({
    extname: '.hbs'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', hbs.engine);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (_req, res) => {
    res.render('home');
})

app.post('/productos', async (req, res) => {
    try {
        const products = await contenedor.save(req.body)
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