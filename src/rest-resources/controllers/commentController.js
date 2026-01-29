const commentService = require("../../handlers/comment.handler");

const addComment = async (req, res, next) => {
    try {
        const { content, blogId } = req.body;
        const userId = req.session.user.id;

        const comment = await commentService.createComment({ content, blogId, userId });

        res.status(201).json({
            message: "COMMENT ADDED",
            comment
        })

    }
    catch (err) {
        next(err);
    }
};

const getBlogComment = async (req, res, next) => {
    try {
        const blogId = req.params.blogId;

        const comments = await commentService.getCommentforBlog(blogId);

        res.json({
            comments
        })
    }
    catch (err) {
        next(err);
    }
};

const editComment = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.session.user.id;

        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const updated = await commentService.editComment(commentId, userId, { content });

        if (!updated) {
            return res.status(404).json({
                message: "COMMENT NOT FOUND"
            })
        };

        res.json({
            message: "COMMENT UPDATED",
            comment: updated
        })
    }
    catch (err) {
        next(err);
    }
};


const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.session.user.id;

        const deleted = await commentService.deleteComment(commentId, userId);

        if (!deleted) {
            return res.status(404).json({
                message: "COMMENT NOT FOUND"
            })
        }

        res.json({
            message: "COMMENT DELETED"
        })
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    addComment,
    getBlogComment,
    editComment,
    deleteComment
}