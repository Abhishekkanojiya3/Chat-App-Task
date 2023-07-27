const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const authenticateSocket = require('./middlewares/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use('/messages', messageRouter);
app.use('/users', userRouter);

io.use(authenticateSocket);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

mongoose
    .connect("mongodb+srv://abhi:abhishek@cluster0.el1cq5i.mongodb.net/")
    .then((result) => {
        console.log("Connected");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });