import bcrypt from 'bcrypt';
import User from '../db/models/user.js';

export const loginUser = async (email, password) => {
    // Database is already initialized in app.js
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

export default loginUser;