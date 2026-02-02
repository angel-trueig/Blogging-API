import Post from "../../db/models/post.js";
import User from "../../db/models/user.js";
import Comment from "../../db/models/comment.js";


export const showAllPost = async (page, limit) => {

    const offset = (page - 1) * limit;

    return await Post.findAll({
        where: {
            status: "active"
        },
        limit,
        offset,
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
    });
};

export default {
    showAllPost
}
