const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductoSchema = new Schema({
    title:{
        type: String,
        require:true
    },
    url:{
        type: String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
});


module.exports = mongoose.model('producto', ProductoSchema);