const loginService = require("../../handlers/login.handler");

module.exports.loginPost = async (req, res, next) => {
    try {
        console.log("LOGIN BODY:", req.body);
        const { email, password } = req.body;

        const user = await loginService.loginUser(email, password);

        if (!user) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }
        req.session.user = {
            id: user.id,
            role: user.role
        };

        res.json({
            message: "LOGIN SUCCESSFUL",
            user: {
                id: user.id,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};
