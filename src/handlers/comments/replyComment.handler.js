import Comment from "../../db/models/comment.js";
import sequelize from "../../config/database.config.js";
import AppError from "../../errors/AppError.js";
import logger from "../../libs/logger.js";


export const createReply = async ({ content, parentId, userId }) => {
    logger.info("creating reply")
    const transaction = await sequelize.transaction();
    try {
        const parent = await Comment.findOne({
            where: { id: parentId },
            transaction
        });

        if (!parent) {
            throw new AppError("Parent Comment not found", 404);
        }

        const comment = await Comment.create(
            {
                content,
                parent_id: parentId,
                user_id: userId,
                post_id: parent.post_id,
            },
            { transaction }
        );
        logger.info("reply crated successfully");

        await Comment.increment("comment_count", {
            by: 1,
            where: { id: parentId },
            transaction
        });
        await transaction.commit();
        return comment;
    } catch (error) {
        await transaction.rollback();
        logger.error("error : ", error.message);
        throw error;
    }
};

export default createReply;