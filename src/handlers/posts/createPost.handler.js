import Post from "../../db/models/post.js";

export const createPost = async ({ title, content, category, authorId }) => {
    return await Post.create({
        title,
        content,
        category,
        author_id: authorId
    });
};

export default {
    createPost
}
