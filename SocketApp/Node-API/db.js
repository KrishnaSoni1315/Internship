var mongoose = require('mongoose');

var chatSchema  = mongoose.Schema({
    name: {type: String, required : true},
    // ,password : {type : String , required: true},
    online : {type : String, enum:['Y', 'N']}
});

module.exports = mongoose.model('ChatApplication', chatSchema);
console.log('Schema Created');