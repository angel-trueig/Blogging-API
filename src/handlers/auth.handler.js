import bcrypt from 'bcrypt';
import User from '../db/models/user.js';

<<<<<<< HEAD:src/handlers/login.handler.js
const loginUser = async (email, password) => {

=======
export const loginUser = async (email, password) => {
    // Database is already initialized in app.js
>>>>>>> feature/recent:src/handlers/auth.handler.js
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

export default loginUser;