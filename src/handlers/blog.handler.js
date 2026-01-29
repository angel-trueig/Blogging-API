const Blog = require("../db/models/blog");
const User = require("../db/models/user");
const Comment = require("../db/models/comment");

const { Op } = require("sequelize");

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
        where: {
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


const showPost = async (id) => {
    return await Blog.findOne({
        where: {
            id,
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


const updateStatus = async (postId, authorId) => {
    const blog = await Blog.findOne({
        where: {
            id: postId,
            author_id: authorId

        }
    });

    if (!blog) {
        return null;
    }

    blog.status = blog.status === 'active' ? 'inactive' : 'active';

    await blog.save();
    return blog;
}


const showPostByCategory = async (category) => {
    return await Blog.findAll({
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


const searchPost = async (query) => {
    return await Blog.findAll({
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



module.exports = {
    createPost,
    showAllPost,
    showPost,
    editPost,
    deletePost,
    updateStatus,
    showPostByCategory,
    searchPost
}