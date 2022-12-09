import mongoose from 'mongoose'


const productSchema = mongoose.Schema({
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
    }
});

export default mongoose.model('productos', productSchema);