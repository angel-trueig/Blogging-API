const { Comment, User, Blog } = require("../db/models");

const createComment = async ({ content, blogId, userId }) => {
    const blog = await Blog.findByPk(blogId);
    if (!blog) throw new Error("BLOG NOT FOUND");

    return await Comment.create({
        content, blog_id: blogId, user_id: userId
    });
};

const getCommentforBlog = async (blogId) => {
    return await Comment.findAll({
        where: { blog_id: blogId },
        include: {
            model: User,
            attributes: ["id", "username", "email"]
        }
    });
};

const getComment = async (id) => {
    return await Comment.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            },
            {
                model: Blog,
                attributes: ["id", "title"]
            }
        ]
    });
};

const editComment = async (id, userId, data) => {
    const comment = await Comment.findByPk(id);

    if (!comment) {
        return null;
    }
    if (comment.user_id != userId) {
        throw new Error("FORBIDDEN");
    }
    return await comment.update(data);
};


const deleteComment = async (id, userId) => {
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


module.exports = {
    createComment,
    getCommentforBlog,
    getComment,
    editComment,
    deleteComment
}