const Response = require("../models/responseModel");


exports.submitResponse = async (req, res) => {
    try {
        const { formId, answers } = req.body
        if(!formId || !answers){
            return res.status(400).json({
                success: false,
                message:"formId or answers are required"
            })
        }
        const created = await Response.create({
            formId, answers
        })

        return res.status(201).json({
            success: true,
            message: "Submit successfully",
            data: created
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getResponses = async (req, res) => {
    try {
        const formId = req.params.id
        const responses = await Response.find({ formId })

        return res.status(200).json({
            success: true,
            message: "Responses fetched",
            data: responses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}