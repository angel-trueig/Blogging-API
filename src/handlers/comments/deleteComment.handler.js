import Comment from "../../db/models/comment.js";

export const deleteComment = async (id, userId) => {
    const comment = await Comment.findByPk(id);

    if (!comment) {
        return null;
    }

    if (comment.user_id != userId) {
        throw new Error("FORBIDDEN");
    }

    await comment.destroy();
    return comment;
};
export default deleteComment;