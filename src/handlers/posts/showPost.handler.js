import Post from "../../db/models/post.js";
import User from "../../db/models/user.js";
import Comment from "../../db/models/comment.js";
import sequelize from "../../config/database.config.js";

export const showPost = async (slug) => {
    const transaction = await sequelize.transaction();
    try {
        const post = await Post.findOne({
            where: {
                slug,
                status: "active"
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email"]
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                }
            ]
        }, { transaction });

        await post.increment('view_count', { by: 1, transaction });
        await transaction.commit();
        return post;
    }
    catch (err) {
        await transaction.rollback();
        throw err;
    }
};

export default {
    showPost
}
