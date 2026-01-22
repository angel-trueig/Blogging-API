const { readDB, writeDB } = require("../utils/db");
const blog = require("../models/blog");
const fs = require("fs/promises");

module.exports.renderForm = (req, res) => {
  res.render("createPost");

}

module.exports.storePost = async (req, res) => {
  let { title, content, category } = req.body;
  const db = await readDB();
  const newPost = new blog(title, content, category);
  db.posts.push(newPost);
  writeDB(db);
  res.redirect("/posts/show");
};

module.exports.show = async (req, res) => {
  try {
    const data = await fs.readFile("./db.json", "utf-8");
    const post = JSON.parse(data);
    res.render("show", { post: post.posts });
  } catch (err) {
    console.error(err);
  }
};

module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));

  res.render("editPost", { post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  post.title = req.body.title;
  post.content = req.body.content;
  post.category = req.body.category;
  writeDB(db);
  res.redirect("/posts/show");
}

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  if (!post) {
    res.send("post not found");
  }
  db.posts = db.posts.filter(p => p.id != Number(id));
  await writeDB(db);
  res.redirect("/posts/show");

};

module.exports.showPost = async (req, res) => {
  const { id } = req.params;
  const db = await readDB();
  const post = db.posts.find(p => p.id === Number(id));
  res.render("showBlog", { post });
}