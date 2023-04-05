const fs = require('fs')


async function leer (){
    let data = await fs.promises.readFile(`./storage/mensajes.json`)
    return data
}

async function guardar(obj){
    await fs.promises.writeFile("./storage/mensajes.json", JSON.stringify(obj, null, 2))
}


module.exports = {
    leer,guardar
}