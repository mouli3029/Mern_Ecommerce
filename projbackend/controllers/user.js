const User = require('../models/user');


exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "No User was found in the DB"
            })
        }
        req.profile = user;
        next();
    })
};

exports.getUser = (req,res)=>{
    //Get back 
    return res.json(req.profile);
}