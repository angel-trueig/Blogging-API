import Post from "../../db/models/post.js";
import AppError from "../../errors/AppError.js";

export const deletePost = async (slug, userId) => {
    const post = await Post.findOne({ where: { slug } });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.author_id !== userId) {
        throw new AppError("You are not allowed to delete this post", 403);
    }

    await post.destroy();
    return post;
};

export default {
    deletePost
}
