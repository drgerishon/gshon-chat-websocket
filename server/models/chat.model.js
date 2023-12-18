const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false,

    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            rer:"User"
        },
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const ChatModel = mongoose.model("Chat", chatSchema)
module.exports = ChatModel