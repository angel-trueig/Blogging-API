const fs = require("fs/promises");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");



module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    const data = await fs.readFile(dbPath);
    const users = JSON.parse(data).users;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({
        message: "user not found"
    });
    if (user.password !== password) {
        return res.status(404).json({
            message: "wrong password"
        });
    }

    req.session.user = {
        id: user.id,
        role: user.role
    }
    res.json({
        message: "login successful",
        user: {
            id: user.id,
            role: user.role
        }
    });
}