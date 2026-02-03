import bcrypt from 'bcrypt';
import User from '../db/models/user.js';

const loginUser = async (email, password) => {

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
        throw new AppError("INVALID_CREDENTIALS", 401);
    }


    return user;
};

export default {
    loginUser
};
