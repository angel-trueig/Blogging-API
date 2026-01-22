const express = require("express");
const router = express.Router();
const blog = require("../controllers/blogController.js");

router.route("/create")
    .get(blog.renderForm)
    .post(blog.storePost);

router.route("/show")
    .get(blog.show);

router.route("/show/:id")
    .get(blog.showPost);

router.route("/:id/edit")
    .get(blog.editPost)

router.route("/:id")
    .put(blog.updatePost)

router.delete("/:id", blog.deletePost);

module.exports = router;