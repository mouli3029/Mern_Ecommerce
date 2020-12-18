require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})
.then((db)=>{
    console.log('DB CONNECTED!!');
})
.catch((err)=>{
    console.log(err);
})

//run from env or run at 8000 port
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})

//We can also use mysql (node module mysql).