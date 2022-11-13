require('dotenv').config()
const express = require ("express");

const router = require('./src/routes/index')

const app = express()
const errorHandler = require('./src/middlewares/error')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/", express.static(__dirname + "/public"))
app.use('/api', router)
app.use(errorHandler)


module.exports = app;