const user = require("./user");

class author extends user {
    constructor(username, email, password, posts = []) {
        super(username, email, password);
        this.posts = posts;
    }
};

module.exports = author;
