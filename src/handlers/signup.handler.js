import User from "../db/models/user.js";

const signupUser = async (username, email, password, role) => {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    const user = await User.create({ username, email, password, role });
    return user;

}

export default {
    signupUser
}