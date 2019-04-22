
const app = require('express')();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = require("./userSchema")
const itemSchema = require('./itemSchema');
const auth = require('./auth');

app.get('/list', auth, (req, res) => {
    itemSchema.find({}, (err, itemSchema) => {
        if (err)
            return res.status(400).send(err);
        res.status(200).send(itemSchema);
    });
});

app.get('/:id', auth, (req, res) => {
    const token = req.header('x-auth-header');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    
   itemSchema.findById(req.params.id, async (err, item) => {
        if (err)
            return res.send(err);
        
        let buyerInfo = await userSchema.findById(mongoose.Types.ObjectId(decoded._id)).exec();
        let sellerInfo = await userSchema.findById(item.seller_id).exec();

        if(item.price <= buyerInfo.points){
            
            let b_points = buyerInfo.points - item.price;
            let s_points = sellerInfo.points + item.price;
           
            let buyer = await userSchema.findOneAndUpdate(
                {"email" : buyerInfo.email},
                {$set : {"points" : b_points}},
                {new : true}
            );
            console.log(buyer);
            let seller = await userSchema.findOneAndUpdate(
                {"email" : sellerInfo.email},
                {$set : {"points" : s_points}},
                {new : true}
            );
            console.log(seller);   
             item.quantity -= req.query.quantity;
            let item_update = await itemSchema.updateOne(
                {"_id" : item._id},
                {$set : {"quantity" : item.quantity }},
                {new : true}
            );
            console.log(item_update);
        }else{
            console.log("!Not Enough Balance");
        }
        res.send(item);
    });
    
});
module.exports = app;
