const Blog = require("../db/models/blog");

const createPost = async ({ title, content, category, authorId }) => {
    return await Blog.create({
        title,
        content,
        category,
        author_id: authorId
    });
};

const showAllPost = async () => {
    return await Blog.findAll({
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


const showPost = async (id) => {
    return await Blog.findByPk(id, {
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

}

const editPost = async (id, userId, data) => {
    const post = await Blog.findByPk(id);

    if (!post) {
        return null;
    }
    if (post.author_id !== userId) {
        throw new Error("FORBIDDEN");
    }

    return await post.update(data)

}


const deletePost = async (id, userId) => {
    const post = await Blog.findByPk(id);

    if (!post) {
        return null;
    }
    if (post.author_id !== userId) {
        throw new Error("FORBIDDEN");
    }

    await post.destroy();
    return post;
}

module.exports = {
    createPost,
    showAllPost,
    showPost,
    editPost,
    deletePost
}