const logger = require("../../src/logger/logger.js")
const minimist = require("minimist")
const os = require('os');
const cpuCores = os.cpus();
const { fork } = require("child_process")
const mockTest = require("../../storage/faker")
const mock = new mockTest()
const cont = require("../negocio/contenedor")
const contenedor = new cont()

const inicio = async (req, res) => {
    const userData = req.user;
    res.render('pages/index', { name: userData.username })
}

const testProductos = async (req, res) => {
    try {
        const products = await mock.getRandomMock();
        res.status(200).render('pages/productos', { listProducts: products, listExist: true })
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
}

const infoo = async (req, res) => {
    try {
        const info = [];
        const inf = `Argumentos de entrada: ${JSON.stringify(minimist(process.argv.slice(2)))}`
        const plat = `Nombre de plataforma: ${process.platform}`
        const node = `Version de node.js: ${process.version}`;
        const memo = process.memoryUsage();
        const mem = `Memoria total reservada: ${memo.rss}`;
        const path = `Path de ejecucion: ${process.execPath}`;
        const pid = `Process id: ${process.pid}`;
        const carp = `Carpeta de proyecto: ${process.cwd()}`
        let data = minimist(process.argv.slice(2))
        if (data.modo == "cluster") {
            if (Number.isInteger(data.i) && data.i > 1) {
                data = data.i
            } else {
                data = cpuCores.length
            }
        } else if (data.modo == "fork" || data.modo == undefined) {
            data = 1
        }
        const proce = `el numero de procesadores en el servidor es: ${data}`
        info.push(inf, plat, node, mem, path, pid, carp, proce)
        res.render('pages/info', { info: info })
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
}

const randomm = async (req, res) => {
    try {
        let num = req.query.cant
        let tot = "";
        if (!num) {
            tot = "100000000"
        }
        tot = num;
        const numeros = fork("./src/routes/calculo.js", [tot]);
        numeros.send("start");
        numeros.on("message", function (sum) {
            res.send(sum)
        })

    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
}

const dataa = async (req, res) => {
    res.send("servidor en puerto: " + parseInt(process.argv[2]))
}

const agregar = async (req, res) => {
    try {
        let data = req.body
        let producto = await contenedor.save(data)
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
}

const producto = async (req, res) => {
    let {id} = req.params
    try{
        const products = await contenedor.getById(id)
        if(products){
            res.status(200).json(products)
        }else{
            res.status(404).json({
            error:`el producto con id: ${id} no existe`
        })
        }
    }catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
}


module.exports = {
    inicio,
    testProductos,
    infoo,
    randomm,
    dataa,
    agregar,
    producto
}