const { readDB, writeDB } = require("../utils/db");
const blog = require("../models/blog");
const fs = require("fs/promises");

module.exports.storePost = async (req, res) => {
  let { title, content, category } = req.body;
  const db = await readDB();
  const newPost = new blog(title, content, category, req.session.user.id);
  db.posts.push(newPost);
  writeDB(db);
  res.json({
    message: "POST CREATED",
    post: newPost
  });
};

module.exports.show = async (req, res) => {
  try {
    const db = await readDB();
    res.json({
      posts: db.posts
    })
  } catch (err) {
    console.error(err);
  }
};

module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  if (post.authorId !== req.session.user.id) {
    return res.status(403).json({
      message: "YOU ARE NOT ALLOWED !!!"
    });
  }
  res.json({
    post
  })
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  if (post.authorId !== req.session.user.id) {
    return res.status(403).json({
      message: "YOU ARE NOT ALLOWED !!!"
    });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  post.category = req.body.category;
  writeDB(db);
  res.json({
    message: "POST UPDATED",
    post
  });
}

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  if (!post) {
    return res.status(404).json({
      message: "POST NOT FOUND!!!"
    });
  }
  if (post.authorId !== req.session.user.id) {
    return res.status(403).json({
      message: "YOU ARE NOT ALLOWED !!!"
    });
  }
  db.posts = db.posts.filter(p => p.id != Number(id));
  await writeDB(db);
  res.json({
    message: "POST DELETED",
    post
  });

};

module.exports.showPost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  if (!post) {
    return res.status(404).json({
      message: "POST NOT FOUND!!!"
    });
  }
  res.json({
    post
  });
}