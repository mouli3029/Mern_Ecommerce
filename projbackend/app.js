require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');


//MY ROUTES
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes  = require('./routes/product')




const app = express();

//DB CONNECTION
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


//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//ROUTES -- prefixing with api (with all the routes).
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);





//PORT
//run from env or run at 8000 port
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})

//We can also use mysql (node module mysql).