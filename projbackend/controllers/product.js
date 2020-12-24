const Product  = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { sortBy } = require('lodash');
const { bulkWrite } = require('../models/product');

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

//Product Listing 
//limit --- limit the products .
exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    //example : Product.find().sort([['updatedAt','descending']])
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.send(400).json({
                error : "Unable to retrive products"
            })
        }
        res.json(products);
    })
}

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct('category',{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error : "No Category Found"
            })
        }
        res.json(category);
    })

}

//stock decreases and sold increases
exports.updateStock = (req,res,next)=>{

    let myOperations  =  req.body.order.products.map(prod=>{

        return {
            updateOne : {
                filter : {_id: prod._id},
                update : {$inc : {stock: -prod.count,sold : +prod.count}}
            }
        }

    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error : "Bulk Operation Failed"
            })
        }
        next();
    })
}
