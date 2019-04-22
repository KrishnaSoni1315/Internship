
const app = require('express')();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('./userSchema');

app.post('/', async (req, res, next) => {
    try {
        req.body.points = 0;
        if(req.body.role == "buyer"){
            req.body.points = 10000;
        }else if(req.body.role == "seller"){
            req.body.points = 50;
        }
        
        const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role','points']));
        await user.save();
        // const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey",{expiresIn : '24h'});
        console.log("Welcome ");
        // res.header('access_token', token).send(_.pick(user, ['name', 'email','role','points']));
        res.send(_.pick(user, ['name', 'email','role','points']));
       
    }
    catch (ex) {
        console.log({ex})
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
            
        console.log(" login Successfully");

        const token = jwt.sign({ _id: User._id, role: User.role }, "secretkey",{expiresIn : '24h'});

         let resData = _.pick(User, ['_id','name', 'email', 'password','role','points']);
         resData['access_token'] = token;

        res.header('access_token', token).send(resData);
    });
});

app.get('/:id',(req,res)=>{
    User.findById(req.params.id,(err,data)=>{
        if(err) 
            return res.send(err)
        res.send(data);
    });
});

module.exports = app;