import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token =
        req.cookies?.access_token ||
        req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.status(401).json({ message: "Access Token required" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" })
        }
        req.user = user;
        next();
    });
};

export const authorizeRole = (role = []) => (req, res, next) => {
    if (role.length && !role.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" })
    }
    next();
}

export default {
    authenticateToken,
    authorizeRole
}