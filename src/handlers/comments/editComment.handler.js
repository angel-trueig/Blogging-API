
import Comment from "../../db/models/comment.js";

export const editComment = async (id, userId, data) => {
    const comment = await Comment.findByPk(id);

    if (!comment) {
        return null;
    }
    if (comment.user_id != userId) {
        throw new Error("FORBIDDEN");
    }
    return await comment.update(data);
};


export default {
    editComment
}