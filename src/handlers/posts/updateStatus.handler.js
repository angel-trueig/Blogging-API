import Post from "../../db/models/post.js";
import AppError from "../../errors/AppError.js";

export const updateStatus = async (slug, authorId) => {
    const post = await Post.findOne({
        where: {
            slug,
            author_id: authorId

        }
    });
    console.log(post);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.author_id !== authorId) {
        throw new AppError("You are not allowed to update the status of this post", 403);
    }

    post.status = post.status === 'active' ? 'inactive' : 'active';

    await post.save();
    return post;
}

export default updateStatus;

