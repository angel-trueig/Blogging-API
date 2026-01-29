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