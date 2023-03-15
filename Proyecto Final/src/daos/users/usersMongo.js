import userModel from '../../../database/mongoDB/models/user.model.js';


class User {
    constructor() {
    }
    
    
    async getById(numberID) {
        try {
            let data = await userModel.find({ id: numberID });
            if (data) {
                return data[0]
            } else {
                return null
            }
        } catch {
            console.error(error)
        }
    }

}


export default User