const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log("Error in connecting DB")
    }
}

module.exports = connectDB;