const User = require("../db/models/user");

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    if (user.password !== password) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return user;
};

module.exports = {
    loginUser
};
