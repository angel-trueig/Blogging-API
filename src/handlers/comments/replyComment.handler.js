import Comment from "../../db/models/comment.js";
import AppError from "../../errors/AppError.js";

export const createReply = async ({ content, parentId, userId }) => {
    const parent = await Comment.findOne({ where: { id: parentId } });
    if (!parent) throw new AppError("Parent Comment not found", 404);

    return await Comment.create({
        content,
        parent_id: parentId,
        user_id: userId,
        post_id: parent.post_id
    })
}

export default createReply;