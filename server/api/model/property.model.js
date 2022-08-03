const mongoose = require('mongoose');

let PropertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    }
},{timestamps:true});


const Property = mongoose.model('Property',PropertySchema);
module.exports=Property;