const mongoose=require('mongoose');

const itemSchema=mongoose.Schema({
    
    product:{type:String,required:true},
    desc : {type:String},
    price : {type:Number,required:true},
    quantity : {type:Number,required:true},
    seller_id : {type : mongoose.Schema.Types.ObjectId}

});

module.exports=mongoose.model('Product',itemSchema);
console.log("schema created");
