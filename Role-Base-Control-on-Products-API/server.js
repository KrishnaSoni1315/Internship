const express = require('express')
const app = express();
const mongoose = require('mongoose');

const user = require('./create_user');
const item_create = require('./item_create');
const item_list = require('./item_list');

mongoose.connect('mongodb://localhost/Shopping_API',{useNewUrlParser: true, useCreateIndex: true} )
    .then(()=>console.log("Database Created"))
    .catch(err=>console.error(err));

app.use(express.json());

app.use('/user',user); //localhost:3000/user
app.use('/seller',item_create);  // only allow for seller
//localhost:3000/seller/add
app.use('/buyer',item_list);  // only allow for buyer
//localhost:3000/buyer/:id

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server Running on "+port+" port number");
});
