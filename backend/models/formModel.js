const mongoose = require("mongoose")


const fieldSchema = new mongoose.Schema({
    label: {
        type: String
    },
    type: {
        type: String
    },
    options: {
        type: [String]
    },
    required: {
        type: Boolean,
        default: false
    }
})

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fields: {
        type: [fieldSchema]
    }
},{ timestamps: true })


const Form = mongoose.model("Form", formSchema)
module.exports = Form