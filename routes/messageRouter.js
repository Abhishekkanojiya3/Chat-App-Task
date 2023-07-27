const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/send', messageController.createMessage);

router.get('/messages', messageController.getMessagesByUsers);

router.put('/:messageId', messageController.updateMessage);

router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;