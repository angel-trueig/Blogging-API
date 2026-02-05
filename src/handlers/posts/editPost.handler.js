import Post from "../../db/models/post.js";
import AppError from "../../errors/AppError.js";

export const editPost = async (slug, userId, data) => {
    const post = await Post.findOne({
        where: {
            slug,
            status: "active"
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }
    if (post.author_id !== userId) {
        throw new AppError("You are not allowed to edit this post", 403);
    }

    return await post.update(data) // for updating slug , use afterUpdate hook

}

export default editPost;

