
import signupService from "../../handlers/signup.handler.js";

export const signupPost = async (req, res, next) => {
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

export default {
    signupPost
}