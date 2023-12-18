const asyncHanlder = require('express-async-handler');
const MessageModel = require('../models/message.mosel');

exports.addMessage = asyncHanlder(async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: 'Message added successfully.' });
    return res.json({ msg: 'Failed to add message to the database' });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.getAllMessage = asyncHanlder(async (req, res, next) => {
  try {
    const {from, to} = req.body;
    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      }
    }).sort({updatedAt: 1})
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    })
    res.status(200).json(projectedMessages)
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500);
    throw new Error(error);
  }
});
