const User = require("../db/models/user");

const signupUser = async (username, email, password, role) => {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    const user = await User.create({ username, email, password, role });
    return user;

}

module.exports = {
    signupUser
}