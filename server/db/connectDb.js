const mongoose = require("mongoose")
require('dotenv').config()
const dbUrl = process.env.MONGO_URL || ""

const connectDB = async() => {
    await mongoose.connect(dbUrl).then((data) => {
        console.log(`mongodb connected on ${data.connection.host}`)
    }).catch((error) => {
        console.log(error)
    })
} 

module.exports = connectDB