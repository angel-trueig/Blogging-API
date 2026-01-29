const User = require("../db/models/user");
const bcrypt = require("bcrypt");
const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
        throw new Error("INVALID_CREDENTIALS");
    }


    return user;
};

module.exports = {
    loginUser
};
