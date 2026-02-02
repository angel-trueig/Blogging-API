import Post from "../../db/models/post.js";
import User from "../../db/models/user.js";
import Comment from "../../db/models/comment.js";
import { Op } from "sequelize";

export const searchPost = async (query) => {
    return await Post.findAll({
        where: {
            title: {
                [Op.iLike]: `%${query}%`
            },
            status: "active"
        },
        include: [{
            model: User,
            attributes: ["id", 'username', 'email']
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
}

export default {
    searchPost
}
