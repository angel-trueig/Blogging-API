import { loginUser } from "../../../handlers/auth.handler.js";
import jwt from 'jsonwebtoken';

export const authorLoginPost = async (req, res, next) => {
    try {
        console.log("LOGIN BODY:", req.body);
        const { email, password } = req.body;

        const author = await loginUser(email, password);
        if (!author || author.role !== "author") {
            return res.status(401).json({
                message: "Invalid author credentials",
            });
        };
        const token = jwt.sign({ id: author.id, role: author.role },
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
            author: {
                id: author.id,
                role: author.role
            }
        });
    } catch (err) {
        next(err);
    }
};

export default authorLoginPost;