const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'secret_key'

const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};

const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};