/* const { readDB, writeDB } = require("../utils/db"); */
const Blog = require("../../db/models/blog");
const blogService = require("../../handlers/blog.handler");

module.exports.storePost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const posts = await blogService.createPost({ title, content, category, authorId: req.session.user.id });

    res.json({
      message: "POST CREATED",
      post: posts
    })
  } catch (err) {
    next(err);
  }
}


module.exports.show = async (req, res, next) => {
  try {
    const posts = await blogService.showAllPost();
    res.json({
      posts
    })
  } catch (err) {
    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPost = await blogService.editPost(id, req.session.user.id, req.body)

    if (!updatedPost) {
      return res.json({ message: "POST NOT FOUND!!!" })
    }
    res.json({
      message: "POST UPDATED",
      post: updatedPost
    });
  } catch (err) {
    next(err);
  }
}

module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await blogService.deletePost(id, req.session.user.id);
    if (!deletedPost) {
      return res.status(404).json({
        message: "POST NOT FOUND!!!"
      });
    }
    res.json({
      message: "POST DELETED",
      post: deletedPost
    });
  } catch (err) {
    next(err);
  }
};

module.exports.showPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await blogService.showPost(id);
    if (!post) {
      return res.status(404).json({
        message: "POST NOT FOUND!!!"
      });
    }
    res.json({
      post
    });
  }
  catch (err) {
    next(err);
  }
}

module.exports.updateStatus = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const authorId = req.session.user.id;

    const blog = await blogService.updateStatus(postId, authorId);
    if (!blog) {
      return res.status(404).json({
        message: "POST NOT FOUND!!!"
      })
    }
    res.json({
      message: `Post Marked as ${blog.status}`
    })

  } catch (err) {
    next(err);
  }
};

module.exports.showPostByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const posts = await blogService.showPostByCategory(category);
    res.json({
      posts
    })
  } catch (err) {
    next(err);
  }
};

module.exports.searchByTitle = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ message: "pls enter the query" })
    };

    const posts = await blogService.searchPost(q);
    res.json({ posts })
  }
  catch (err) {
    next(err);
  }
}