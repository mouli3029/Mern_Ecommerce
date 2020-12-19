const User = require('../models/user');
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const user = require('../models/user');

exports.signup = (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param,
        })
    }


    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : "Not able to save in user in DB"
            })
        }
        res.json({
            name : user.name,
            email :user.email,
            id : user._id
        });
    })
}

exports.signin = (req,res) =>{
    const {email,password} = req.body;  //Destructing Object
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param,
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
                return res.status(400).json({
                    error : "User email doesnot exists"
                })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and Password do not match !"
            })          
        }

        //Create  token 
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        //Put token in cookie.
        res.cookie("token",token,{expire: new Date()+9999});

        //send response to front end.
        const {_id,name,email,role} = user;
        return res.json({token,user : {_id,name,email,role}})
    })



}


exports.signout = (req,res) =>{
    res.clearCookie("token");
    res.json({
        message : "User Singout Successfully !"
    });
};

//PROTECTED Routes

exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
    //userProperty is kept in the req where you place isSigned 
});



//Custom MIDDLEWARES
exports.isAuthenticated = (req,res,next) =>{
    //profile is made from frontend,auth from isSigned
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENINED"
        });
    }

    next();
}

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error : "You are not ADMIN, ACCESS DENIED"
        });
    }
    next();
}