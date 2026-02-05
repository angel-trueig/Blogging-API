import Post from '../../../db/models/post.js';
import { Op } from "sequelize";

export const getRecentPostsHandler = async (req) => {
    const time_window = new Date(
        Date.now() - 24 * 60 * 60 * 1000
    );
    const recentPosts = await Post.findAll({
        attributes: [
            'id',
            'title',
            'slug',
            'view_count',
            'comments_count',
            'created_at'
        ],
        where: {
            created_at: {
                [Op.gte]: time_window
            }
        },
        order: [['created_at', 'DESC']],
        limit: 20
    });

    return {
        success: true,
        count: recentPosts.length,
        data: recentPosts
    };
};

export default { getRecentPostsHandler };
