const mongoose = require('mongoose');
const crypto = require('crypto');
import { v1 as uuidv1 } from 'uuid';

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
},{timestamps : true});

userSchema.virtual('password')
   .set(function(password){
       // _ for private
       this._password = password;
       this.salt = uuidv1();
       this.encry_password = this.securePassword(password);
   })
   .get(function(){
       return this._password;
   });

//Creating schema methods ..

userSchema.method = {

    authenticate : function(plainpassword){
        return this.securePassword(password) === this.encry_password;
    },

    securePassword : function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
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