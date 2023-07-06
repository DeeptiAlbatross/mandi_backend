const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
var categoryRouter = require('./project/category/routing');
var authRouter = require("./project/authentication/controller")
var addToCartRouter = require("./project/addToCart/routing")

const app=express();
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

const url='mongodb+srv://deepti:dev1212@cluster0.fmvisdh.mongodb.net/?retryWrites=true&w=majority'



mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    // Continue with your code here
  })
  .catch((error) => { 
    console.error('Error connecting to MongoDB:', error);
  });
  mongoose.connection.on('error', err => {
    console.log(err);
  });

  mongoose.connection.on('connect', err => {
    console.log("Database is connected...");
  });

app.use('/auth', authRouter);
app.use('/cart', addToCartRouter);

app.use('/', categoryRouter);

// listening port
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});
