const productosDao = require("../negocio/contenedor")
const Productos = require("../repository/producto")


export default class productoRepo {
    constructor(){
        this.dao = new productosDao();
    }

    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new Producto(dto))
    }

    add(prod){
        const dto = new Producto(prod)
        return this.dao.save(dto)
    }

    getById(prod){
        const dto = new Producto(prod)
        return this.dao.getById(dto.id)
    }

}