class messagesDTO{
    constructor(data){
        this.email = data.author.email,
        this.time = data.time,
        this.text = data.text
    }
}

module.exports = messagesDTO