const Message = require('../models/Message');
const User = require('../models/User');

const createMessage = async(req, res) => {
    try {
        const { senderUsername, receiverUsername, content } = req.body;

        const senderUser = await User.findOne({ username: senderUsername });
        const receiverUser = await User.findOne({ username: receiverUsername });

        if (!senderUser || !receiverUser) {
            return res.status(404).json({ error: 'Sender or receiver user not found.' });
        }

        const newMessage = new Message({ sender: senderUsername, receiver: receiverUsername, content });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully.', data: newMessage });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while sending the message.' });
    }
};

const getMessagesByUsers = async(req, res) => {
    try {
        const { senderUsername, receiverUsername } = req.query;

        const messages = await Message.find({
            $or: [
                { sender: senderUsername, receiver: receiverUsername },
                { sender: receiverUsername, receiver: senderUsername },
            ],
        }).sort('timestamp');

        res.status(200).json({ data: messages });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving messages.' });
    }
};

const updateMessage = async(req, res) => {
    try {
        const { messageId } = req.params;
        const { content } = req.body;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        message.content = content;
        await message.save();

        res.status(200).json({ message: 'Message updated successfully.', data: message });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the message.' });
    }
};

const deleteMessage = async(req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        await message.remove();

        res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the message.' });
    }
};

module.exports = {
    createMessage,
    getMessagesByUsers,
    updateMessage,
    deleteMessage,
};