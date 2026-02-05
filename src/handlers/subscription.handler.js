import Subscription from "../db/models/subscription.js";
import User from "../db/models/user.js";
import AppError from "../errors/AppError.js";


export const subscribe = async (userId, authorId) => {
    if (userId === Number(authorId)) {
        throw new AppError("You cannot subscribe to yourself");
    }

    const author = await User.findByPk(authorId);
    if (!author || author.role !== "author") {
        throw new AppError("Author not found");
    }

    await Subscription.create({
        subscriber_id: userId,
        author_id: authorId,
    });
};

export const unsubscribe = async (userId, authorId) => {
    const subscription = await Subscription.findOne({
        where: {
            subscriber_id: userId,
            author_id: authorId,
        },
    });

    if (!subscription) {
        throw new AppError("Subscription not found", 404);
    }

    await subscription.destroy();
};

export const getUserSubscriptions = async (userId) => {
    const user = await User.findByPk(userId);

    return await user.getSubscribedAuthors({
        attributes: ["id", "username", "email"],
        through: {
            where: { isActive: true },
            attributes: [],
        },
    });
};

export const getSubscribers = async (authorId) => {
    const author = await User.findByPk(authorId);

    if (!author || author.role !== "author") {
        throw new AppError("Author not found");
    }

    return await author.getSubscribers({
        attributes: ["id", "username", "email"],
        through: {
            where: { isActive: true },
            attributes: [],
        },
    });
};

