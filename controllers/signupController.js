const User = require("../models/user");

module.exports.signupForm = (req, res) => {
    res.render("signup");
};

module.exports.signupPost = (req, res) => {
    const { username, email, password } = req.body;
    const id = Date.now();
    const user = new User(id, username, email, password);
    user.save();
    res.redirect("/posts/show");
}
