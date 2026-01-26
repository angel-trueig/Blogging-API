const User = require("../models/user");


module.exports.signupPost = async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = new User(username, email, password, role);
    await user.save();
    res.json({
        message: "user created",
        user: {
            id: user.id,
            role: user.role
        }
    });
}
