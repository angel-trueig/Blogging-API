import {
    subscribe,
    unsubscribe,
    getUserSubscriptions,
    getSubscribers
} from "../../handlers/subscription.handler.js";

export const subscribeAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const userId = req.user.id;

        await subscribe(userId, authorId);

        return res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
        next(err)
    }
};

export const unsubscribeAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const userId = req.user.id;

        await unsubscribe(userId, authorId);

        return res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (err) {
        next(err);
    }
};

export const getMySubscriptions = async (req, res, next) => {
    try {
        const data = await getUserSubscriptions(req.user.id);
        return res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

export const getAuthorSubscribers = async (req, res, next) => {
    try {
        const { authorId } = req.params;
        const data = await getSubscribers(authorId);
        return res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};
