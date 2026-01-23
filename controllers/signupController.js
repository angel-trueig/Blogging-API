const User = require("../models/user");

module.exports.signupForm = (req, res) => {
    res.render("signup");
};

module.exports.signupPost = (req, res) => {
    const { username, email, password, role } = req.body;
    const id = Date.now();
    const user = new User(id, username, email, password, role);
    user.save();
    res.redirect("/login");
}
