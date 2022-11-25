const knexConfig = require("../database/config");
const knexDb  = require('knex');


class Contenedor {
    constructor() {
        this.knexConfig = knexConfig;
    }

    async save(product){
        const knex = knexDb(this.knexConfig);
        try{
            await knex('products').insert(product).then(()=> {
                console.log("nuevo producto ingresado")
            }).catch(err =>{
                console.error(err)
            }).finally(()=>{
                knex.destroy();
            });
        }catch(err){
            console.error(err) 
        }
    }

    async getAll(){
        const knex = knexDb(this.knexConfig);
        try{
            let products=[];
            await knex('products').select('*').then(data =>{
                const newData = data.map(i=>(
                    JSON.parse(JSON.stringify(i))
                ))
                products= newData;
            }).catch(err =>{
                console.error(err)
            }).finally(()=>{
                knex.destroy();
            });
            return products;
        }catch(err){
            console.error(err) 
        }
    }
}

module.exports = Contenedor