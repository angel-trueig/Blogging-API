const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.name = username;
        this.email = email;
        this.password = password;

    }
    async save() {
        const data = await fs.readFile(dbPath);
        const parsedData = JSON.parse(data);
        parsedData.users.push(this);
        fs.writeFile(dbPath, JSON.stringify(parsedData));
    }
};


module.exports = User;