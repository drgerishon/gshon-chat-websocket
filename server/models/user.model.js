const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter name"],
        min: 3,
        max: 30,
        unique: true
    },
    email: {
        type:String,
        required: [true, "please enter email"],
        unique: true,
        max: 50
    },
    password: {
        type:String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
}, {timestamps: true})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel