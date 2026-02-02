import loginService from "../../handlers/login.handler.js";
import jwt from 'jsonwebtoken';

export const loginPost = async (req, res, next) => {
    try {
        console.log("LOGIN BODY:", req.body);
        const { email, password } = req.body;

        const user = await loginService.loginUser(email, password);

        if (!user) {
            return res.status(404).json({
                message: "USER NOT FOUND"
            });
        }

        const token = jwt.sign({ id: user.id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "12h"
            }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 12 * 60 * 60 * 1000
        });


        res.json({
            message: "LOGIN SUCCESSFUL",
            token,
            user: {
                id: user.id,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};

export default {
    loginPost
}