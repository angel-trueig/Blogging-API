import likeService from "../../handlers/like.handler.js";
import { getIo } from "../../socket-resources/socketServer.js";


export const toggleLike = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        const result = await likeService.toggleLike(userId, postId);

        //socket
        const io = getIo();
        //global -> willll work everyt timeee
        io.emit("postLikeUpdated", {
            postId, userId, action: result.action, totalLikes: result.totalLike
        });

        //will work only if post belongs to author
        if (result.action === "liked") {
            io.to(`user_${result.postAuthorId}`).emit("notification", {
                type: "LIKE",
                senderId: userId,
                postId,
                message: "Someone liked your post"
            })
        }
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