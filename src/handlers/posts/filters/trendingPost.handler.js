import Post from '../../../db/models/post.js';
import Sequelize from 'sequelize';

export const getTrendingPostsHandler = async () => {
    const posts = await Post.findAll({
        attributes: [
            "id",
            "title",
            "slug",
            "view_count",
            "comments_count",
            "created_at",
            [Sequelize.literal('view_count + comments_count'), 'trend_score']
        ],
        order: [[(Sequelize.literal('trend_score')), "DESC"]],
        limit: 20
    });
    return posts;
}

export default {
    getTrendingPostsHandler
}
