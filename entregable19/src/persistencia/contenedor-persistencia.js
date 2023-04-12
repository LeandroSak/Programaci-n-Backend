const fs = require('fs')


async function leer (){
    let data = await fs.promises.readFile(`./storage/productos.txt`, 'utf-8')
    return data
}

async function guardar(obj){
    await fs.promises.writeFile("./storage/productos.txt", JSON.stringify(obj, null, 2))
}


module.exports = {
    leer,guardar
}