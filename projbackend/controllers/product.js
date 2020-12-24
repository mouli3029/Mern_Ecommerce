const Product  = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate('category')
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Product not Found"
            })
        }
        req.product = product;
        next();
    })
}
exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "Problem with Image"
            });
        }

        
        //Destructing the fields

        const {price,name,description,category,stock} = fields;

        if( !name || !description || !price || !category || !stock){
            return res.status(400).json({
                error : "Please include all the fields"
            })
        }
        let product = new Product(fields);
        //Handling the file here..   2 * 1024 * 1024
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }

        //console.log(product);

        //save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "saving tshirt in DB failed"
                })
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req,res)=>{
    //mp3 and phtos and so on cannot be done easily with get request.
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo  = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res)=>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to delete the product"
            })
        }
        res.json({
            message : "Deletion successfull !!",
            deletedProduct
        })
    })
}

exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "Problem with Image"
            });
        }

        let product = req.product;
        //fields are updated inside the product.
        product = _.extend(product,fields)
        //Handling the file here..   2 * 1024 * 1024
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }

        //console.log(product);

        //save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "Udation of Product failed"
                })
            }
            res.json(product);
        })
    })
}