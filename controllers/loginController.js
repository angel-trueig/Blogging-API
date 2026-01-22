const fs = require("fs/promises");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");


module.exports.loginForm = (req, res) => {
    res.render("login");
};

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    const data = await fs.readFile(dbPath);
    const users = JSON.parse(data).users;

    const user = users.find(u => u.email === email);
    if (!user) return res.send("user not found");
    if (user.password !== password) {
        return res.send("wrong password");
    }
    res.redirect("/posts/show");
}