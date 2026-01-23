const User = require('./user');

class Author extends User {
    constructor(id, username, email, password) {
        super(id, username, email, password, 'author');
    }
}

module.exports = Author;