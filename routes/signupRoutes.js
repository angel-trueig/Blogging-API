const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.route("/")
    .get(signupController.signupForm)
    .post(signupController.signupPost);

module.exports = router;