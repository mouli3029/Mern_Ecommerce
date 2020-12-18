const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema;



const productSchema =  new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },
    description : {
        type : String,
        trim : true,
        required : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        required : true,
        maxlength : 32,
        trim : true
    },
    //Linking to previous schema 
    //ref from where  your are pulling in.
    category : {
        type : ObjectId,
        ref : 'Category',
        required : true,
    },
    stock : {
        type : Number,
    },
    sold : {
        type : Number,
        default : 0
    },
    photo : {
        //Storing in database ..
        data : Buffer,
        contentType : String,
    }
},{timestamps : true});

module.exports = mongoose.model('Product',productSchema);