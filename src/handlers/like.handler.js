import Like from "../db/models/like.js";
import Post from "../db/models/post.js";


const toggleLike = async (userId, postId) => {
    const post = await Post.count({ where: { id: postId } });
    if (!post) throw new Error("POST_NOT_FOUND");

    const existingLike = await Like.findOne({
        where: {
            userId,
            postId
        }
    });

    if (existingLike) {
        await existingLike.destroy();
        return { liked: false, message: "UNLIKED" };
    }

    await Like.create({
        userId,
        postId
    });
    return { liked: true, message: "LIKED" };
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