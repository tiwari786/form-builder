const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const formRouter = require("./routes/formRouter")
const responseRouter = require("./routes/responseRouter")
const cors  = require("cors")
dotenv.config()




const server = express()
server.use(express.json())

server.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

server.use("/api/form", formRouter)
server.use("/api/responses", responseRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    try {
        connectDB()
        console.log(`Server is running on ${PORT}`)
    } catch (error) {
        console.log("Server not respond", error)
    }
})