const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.ObjectId,
        ref: "Form"
    },
    answers: {
        type: Object
    }
}, { timestamps: true })


const Response = mongoose.model("Response", responseSchema)
module.exports = Response