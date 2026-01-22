const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.route("/")
    .get(loginController.loginForm)
    .post(loginController.loginPost);

module.exports = router;
