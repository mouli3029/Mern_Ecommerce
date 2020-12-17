const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true,   // removes extra spaces
    },
    lastname : {
        type : String,
        maxlength : 32,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true,
    },
    userinfo : {
        type : String,
        trim : true
    },
    //TODO: come back here
    encry_password :{
        type : String,
        required : true,
    },
    salt : String,

    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type : Array,
        default : []
    }
});

//Creating schema methods ..

userSchema.method = {
    securePassword : function(plainpassword){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){
            //Since empty password cannot be returned (required : true),Monogo throws the error.
            return "";
        }
    }
}


module.exports = mongoose.model('User',userSchema);