
import mongoose  from 'mongoose'


const cartSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    timestamp:{
        type: String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    productos:{
        type:[{
            title: {
                type: String,
                required: true
            },
            price:{
                type: mongoose.Types.Decimal128,
                require: true,
            },
            timestamp:{
                type: String,
                require: true,
            },
            url:{
                type: String,
                require: true
            },
            description:{
                type: String,
                require:true
            },
            stock:{
                type: Number,
                require: true
            },
            id:{
                type: Number,
                require: true
            },
            cantidad:{
                type:Number,
                require:false
            }
        }]}
    
});


export default mongoose.model('carritos', cartSchema)
