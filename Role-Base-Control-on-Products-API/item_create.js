
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');

const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var item = require('./itemSchema');
const auth=require('./auth');
// const role = require('./role');

// Create
app.post('/add',auth,(req,res)=>{

    const token = req.header('x-auth-header');
    const decoded = jwt.verify(token, "secretkey",{expiresIn:'24h'});

    item.create({
        product:req.body.product,
        desc:req.body.desc,
        price:req.body.price,
        quantity:req.body.quantity,
        seller_id : mongoose.Types.ObjectId(decoded._id)

    },(err,item)=>{
        if(err){
            return res.send(err);}
        else{
        res.send(item);}
    });
});
// Read
app.get('/all',auth,(req,res)=>{
    item.find({},(err,item)=>{
        if(err)
            return res.send("Can Not Get Your Item");
        res.send(item);
    });
});

// Update
app.put('/:id',auth,(req,res)=>{
    item.findOneAndUpdate(req.params.id,
        req.body,
        {new:true},(err,item)=>{
            if(err)
                return res.send(err);
            res.send(item);
        });
});

// Delete
app.delete('/:id',auth,(req,res)=>{
    item.findByIdAndRemove(req.params.id,(err,item)=>{
        if(err)
            return res.send(err);
        res.send(item.product+" Product Deleted");
        // res.send(item+" Deleted");
    });
});

module.exports = app;
