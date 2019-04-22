
const jwt = require('jsonwebtoken');

const role= require('./role');

module.exports =(req, res, next)=>
{
    const token = req.header('x-auth-header');
    if (!token) 
        return res.send('Access Denied: No Token Provided!');
    try 
    {
        const decoded = jwt.verify(token, "secretkey");
        if(role[decoded.role].find((url)=>
        { 
            return url==req.baseUrl
        }))
        {
            req.user=decoded
            next();
        }
        else
            return res.send('Access Denied: You dont have correct privilege to perform this operation');
    }
    catch (ex) 
    {
        res.send("Invalid Token");
    }
}