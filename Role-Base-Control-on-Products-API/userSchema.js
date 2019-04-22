const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    
name: {
type: String,
required: true,
minlength: 2,
maxlength: 50
},
email: {
unique : true,
type: String,
required: true,
minlength: 11,
maxlength: 50
},
password: {
type: String,
required: true,
minlength: 5,
maxlength: 50
},
role: String,
points:{type : Number}
});

module.exports=mongoose.model('User',userSchema);