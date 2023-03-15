import mongoose  from 'mongoose'



const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    name:{
        type: String,
        require:true
    },
    adress:{
        type: String,
        require:true
    },
    age:{
        type: Number,
        require:true
    },
    phone:{
        type: String,
        require:true
    },
    clase:{
        type: String,
        require:true
    },
    id:{
        type:Number,
        require:true
    }
});

export default mongoose.model('users', UserSchema);