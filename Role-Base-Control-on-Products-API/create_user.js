
const app = require('express')();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');

app.post('/', async (req, res, next) => {
    try {
        req.body.points = 0;
        if(req.body.role == "buyer"){
            req.body.points = 1000;
        }else if(req.body.role == "seller"){
            req.body.points = 50;
        }
        const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role','points']));
        await user.save();
        const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey",{expiresIn : '24h'});
        res.header('x-auth-header', token).send(_.pick(user, ['name', 'email','role','points']));
    }
    catch (ex) {
        res.send(ex);
    }
});

app.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    },(err,User)=>{
        if(err) 
            return res.send("Error on the Server");
        if(!User)
            return res.send("User Not Found");

        var passwordIsValid = (req.body.password,User.password);

        if(!passwordIsValid)
            return res.send("Password Not Valid");
        var token = jwt.sign({ _id: User._id}, "secretkey",{expiresIn:'12h'});
        res.header('x-auth-header', token).send(_.pick(User, ['name', 'email', 'password','role','points']));
    });
});

module.exports = app;