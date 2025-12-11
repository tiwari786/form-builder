const express = require("express")
const { createForm, getForms, getFormById, updateForm, deleteForm } = require("../controllers/formController")

const formRouter = express.Router()


formRouter.route("/").post(createForm).get(getForms);
formRouter.route("/:id").get(getFormById).put(updateForm).delete(deleteForm)


module.exports = formRouter