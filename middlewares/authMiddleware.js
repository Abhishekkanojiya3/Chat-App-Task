const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';
const User = require('../models/User');

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error. Token not provided.'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        User.findById(userId, (err, user) => {
            if (err || !user) {
                return next(new Error('Authentication error. User not found.'));
            }

            socket.user = user;
            next();
        });
    } catch (error) {
        next(new Error('Authentication error. Invalid token.'));
    }
};

module.exports = authenticateSocket;