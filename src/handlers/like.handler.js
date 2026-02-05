
import Like from "../db/models/like.js";
import Post from "../db/models/post.js";
import Notification from "../db/models/notification.js";


const toggleLike = async (userId, postId) => {
    const post = await Post.findByPk(postId);
    if (!post) throw new Error("POST_NOT_FOUND");
    let action;

    const existingLike = await Like.findOne({
        where: {
            userId,
            postId
        }
    });

    if (existingLike) {
        await existingLike.destroy();
        action = "unliked";
    } else {

        await Like.create({
            userId,
            postId
        });
        action = "liked";

    }

    if (action == "liked" && post.userId != userId) {
        await Notification.create({
            reciever_id: post.author_id,
            sender_id: userId,
            notify_type: "like",
            message: "Post liked",
            post_id: postId
        })

    }

    const totalLike = await getLikes(postId);

    return { action, totalLike, postAuthorId: post.author_id, message: `Post ${action}` };

}

const getLikes = async (postId) => {
    return await Like.count({
        where: {
            postId
        }
    });
}

export default {
    toggleLike,
    getLikes
}