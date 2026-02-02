import { createComment } from "../../handlers/comments/createComment.handler.js";
import { getCommentforPost } from "../../handlers/comments/getPostComment.handler.js";
import { editComment } from "../../handlers/comments/editComment.handler.js";
import { deleteComment } from "../../handlers/comments/deleteComment.handler.js";
import { createReply } from "../../handlers/comments/replyComment.handler.js";
import buildCommentTree from "../../utils/buildCommentTree.js";


export const addComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const userId = req.user.id;
        const postId = req.params.postId;

        const comment = await createComment({ content, postId, userId });

        res.status(201).json({
            message: "COMMENT ADDED",
            comment
        })

    }
    catch (err) {
        next(err);
    }
};

export const getPostComment = async (req, res, next) => {
    try {
        console.log("req.params:", req.params.postId);
        const postId = req.params.postId;
        const { limit = 50, offset = 0 } = req.query;

        const comments = await getCommentforPost(postId, { limit, offset });
        const commentTree = buildCommentTree(comments);
        res.json({
            comments: commentTree,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: comments.length === parseInt(limit)
            }
        })
    }
    catch (err) {
        next(err);
    }
};

export const editCommentPost = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const updated = await editComment(commentId, userId, { content });

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


export const deleteCommentPost = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        const deleted = await deleteComment(commentId, userId);

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


export const addReply = async (req, res, next) => {
    try {
        const { content } = req.body;
        const { commentId } = req.params;

        const userId = req.user.id;
        const reply = await createReply({ content, parentId: commentId, userId });

        res.status(201).json({
            message: "REPLY ADDED",
            reply
        })

    }
    catch (err) {
        next(err);
    }
}

export default {
    addComment,
    getPostComment,
    editCommentPost,
    deleteCommentPost
}