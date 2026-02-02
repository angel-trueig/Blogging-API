import likeService from "../../handlers/like.handler.js";


export const toggleLike = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        const result = await likeService.toggleLike(userId, postId);

        res.json({
            message: result.message
        })
    } catch (err) {
        next(err);
    }
}

export const getLikes = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const likes = await likeService.getLikes(postId);
        res.json({
            postId,
            likes
        })
    } catch (err) {
        next(err);
    }
}

export default {
    toggleLike,
    getLikes
}