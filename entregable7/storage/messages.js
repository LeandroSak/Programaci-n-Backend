const knexConfig = require("../database/config");
const knexDb  = require('knex');


class Message {
    constructor() {
        this.knexConfig = knexConfig;
    }

    async save(message){
        const knex = knexDb(this.knexConfig);
        try{
            await knex('messages').insert(message).then(()=> {
                console.log("nuevo mensage ingresado")
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
            let messages=[];
            await knex('messages').select('*').then(data =>{
                const newData = data.map(i=>(
                    JSON.parse(JSON.stringify(i))
            
                ))
                messages= newData;
            }).catch(err =>{
                console.error(err)
            }).finally(()=>{
                knex.destroy();
            });
            return messages;
        }catch(err){
            console.error(err)
        }
    }

}

module.exports = Message