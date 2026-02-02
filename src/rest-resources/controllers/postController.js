
import { createPost } from "../../handlers/posts/createPost.handler.js";
import { showAllPost } from "../../handlers/posts/showAllPosts.handler.js";
import { editPost } from "../../handlers/posts/editPost.handler.js";
import { deletePost } from "../../handlers/posts/deletePost.handler.js";
import { showPost } from "../../handlers/posts/showPost.handler.js";
import { updateStatus } from "../../handlers/posts/updateStatus.handler.js";
import { showPostByCategory } from "../../handlers/posts/showPostByCategory.handler.js";
import { searchPost } from "../../handlers/posts/searchPost.handler.js";


export const storePost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const posts = await createPost({ title, content, category, authorId: req.user.id });

    res.json({
      message: "POST CREATED",
      post: posts
    })
  } catch (err) {
    next(err);
  }
}


export const showAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await showAllPost(page, limit);
    res.json({
      page,
      limit,
      posts
    })
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const updatedPost = await editPost(slug, req.user.id, req.body)
    res.json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (err) {
    next(err);
  }
}

export const deletePosts = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const deletedPost = await deletePost(slug, req.user.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost
    });
  } catch (err) {
    next(err);
  }
};

export const showSinglePost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await showPost(slug);
    if (!post) {
      return res.status(404).json({
        message: "POST NOT FOUND!!!"
      });
    }
    res.json({
      post,
      comments_count: post.comments_count

    });
  }
  catch (err) {
    next(err);
  }
}

export const updateStatusPost = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const authorId = req.user.id;

    const post = await updateStatus(slug, authorId);

    res.json({
      message: `Post Marked as ${post.status}`
    })

  } catch (err) {
    next(err);
  }
};

export const showByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const posts = await showPostByCategory(category);
    res.json({
      posts
    })
  } catch (err) {
    next(err);
  }
};

export const searchByTitle = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ message: "pls enter the query" })
    };

    const posts = await searchPost(q);
    res.json({ posts })
  }
  catch (err) {
    next(err);
  }
}

export default {
  storePost,
  showAll,
  updatePost,
  deletePosts,
  showSinglePost,
  updateStatusPost,
  showByCategory,
  searchByTitle
}