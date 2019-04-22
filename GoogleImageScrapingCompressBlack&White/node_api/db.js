const mongoose = require('mongoose');

const imgSchema = mongoose.Schema({
    keyword: {type:String, required : true}
});

module.exports= mongoose.model('BeforeSearch',imgSchema);
console.log("Schema created");