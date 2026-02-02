import Comment from "../../db/models/comment.js";
import User from "../../db/models/user.js";

export const getCommentforPost = async (postId, options = {}) => {
    const { limit = 10, offset = 0 } = options;

    return await Comment.findAll({
        where: { post_id: postId, is_deleted: false },
        include: [
            {
                model: User,
                attributes: ["id", "username", "email"]
            }
        ],
        order: [["createdAt", "ASC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
        raw: true,
        nest: true
    });
};

export default getCommentforPost;
