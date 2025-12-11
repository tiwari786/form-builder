const express = require("express")
const { submitResponse, getResponses } = require("../controllers/responseController")
const responseRouter = express.Router()

responseRouter.route("/").post(submitResponse);
responseRouter.route("/:id").get(getResponses);



module.exports = responseRouter