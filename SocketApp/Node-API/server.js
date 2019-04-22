var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);

var io = require('socket.io').listen(server);

var path = require('path');
app.use(express.static(path.join('public')));

var database = require('./db');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/Chat', { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log("Database Created"))
    .catch(err => console.log('Database Error'));
    

function SaveChatUser(user){
    database.create({
    name: user,
    online : 'Y'
    },(err,res)=>{
        if(err){
            return res.send(err);
        }
    });
}


io.on('connection', (socket) => {
    console.log('connected');
    
    //joining
    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(data.user + ' joined the room: ' + data.room);
        socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: ' Online' });
        SaveChatUser(data.user);
    });

    //leaving
    socket.on('leave', (data) => {
        console.log(data.user + ' left the room: ' + data.room);
        socket.broadcast.to(data.room).emit('left room', { user: data.user, message: ' Offline' });
        socket.leave(data.room);
    })

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
    });
});

server.listen(3000, () => {
    console.log("server running ");
});


