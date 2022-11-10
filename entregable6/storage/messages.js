const fs = require('fs')


class Message {
    constructor() {

    }
    async save(objeto) {

        try {
            let data = await fs.promises.readFile(__dirname +`/messagess.json`)
            let messageJason = JSON.parse(data)
            messageJason.push({ userEmail: objeto.userEmail, message: objeto.message, time: objeto.time })
            await fs.promises.writeFile(__dirname +"/messagess.json", JSON.stringify(messageJason, null, 2))
            return 
        } catch {
            console.error(error)
        }
    }

    async getAll() {
        let file = await fs.promises.readFile(`./storage/messagess.json`)
            .then(data => {
                let jsonData = JSON.parse(data)
                return jsonData
            })
            .catch(error => console.log(error))
        return file
    }

}

module.exports = Message