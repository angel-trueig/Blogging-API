import Post from "../../db/models/post.js";
import User from "../../db/models/user.js";
import Comment from "../../db/models/comment.js";

export const showPostByCategory = async (category) => {
    return await Post.findAll({
        where: {
            category,
            status: "active"
        },
        include: [{
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
    })
};

export default {
    showPostByCategory
}