import Post from "../../db/models/post.js";
import Comment from "../../db/models/comment.js";
import sequelize from "../../config/database.config.js";
import AppError from "../../errors/AppError.js";

export const createComment = async ({ content, postId, userId }) => {
    const transaction = await sequelize.transaction();
    try {
        const post = await Post.count({ where: { id: postId }, transaction });
        if (!post) throw new AppError("Post Not Found", 404);

        const comment = await Comment.create({
            content, post_id: postId, user_id: userId
        }, { transaction });

        await Post.increment('comments_count', {
            by: 1,
            where: { id: postId },
            transaction
        })

        await transaction.commit();
        return comment;
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};
export default {
    createComment
}