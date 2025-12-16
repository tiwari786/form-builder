const Form = require("../models/formModel");


exports.createForm = async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required",
                success: false
            })
        }

        const created = await Form.create({
            title, description, fields
        })

        return res.status(201).json({
            success: true,
            message: "Form created successfully",
            data: created
        });

    } catch (error) {
        console.log("error :", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find()

        return res.status(200).json({
            success: true,
            message: "Forms fetched",
            data: forms
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const form = await Form.findById(formId)

        if (!form) {
            return res.status(404).json({
                message: "not found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Form found",
            data: form
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.updateForm = async (req, res) => {
    try {
        const formId = req.params.id
        const form = await Form.findByIdAndUpdate(formId, req.body, { new: true })

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Form updated successfully",
            data: form
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


exports.deleteForm = async (req, res) => {
    try {
        const formId = req.params.id
        await Form.findByIdAndDelete(formId)

        return res.status(200).json({
            success: true,
            message: "Form deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}