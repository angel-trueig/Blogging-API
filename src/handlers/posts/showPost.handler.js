import Post from "../../db/models/post.js";
import User from "../../db/models/user.js";
import Comment from "../../db/models/comment.js";

export const showPost = async (slug) => {
    return await Post.findOne({
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
    });
};

export default {
    showPost
}
