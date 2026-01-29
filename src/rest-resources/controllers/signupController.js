const User = require("../../db/models/user");
const signupService = require("../../handlers/signup.handler");

module.exports.signupPost = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        const user = await signupService.signupUser(username, email, password, role);
        res.json({
            message: "SUCCESSFUL",
            user: {
                id: user.id,
                role: user.role
            }
        });
    }
    catch (err) {
        next(err);
    };
};
