const messagesDao = require("../negocio/messages")
const Message = require("../repository/message")

export default class messageRepo {
    constructor(){
        this.dao = new messagesDao();
    }

    async getAll(){
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new Message(dto))
    }

    add(message){
        const dto = new Message(message)
        return this.dao.save(dto)
    }
}