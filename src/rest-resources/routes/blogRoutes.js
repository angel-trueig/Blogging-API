const express = require("express");
const router = express.Router();
const blog = require("../controllers/blogController.js");
const { Authentication, Author } = require("../middleware/auth.js");



router.route("/create")
    .post(Authentication, Author, blog.storePost);

router.route("/show")
    .get(blog.show);

router.route("/show/:id")
    .get(blog.showPost);


router.route("/:id")
    .put(Authentication, Author, blog.updatePost)

router.delete("/:id", Authentication, Author, blog.deletePost);

router.patch("/:id", Authentication, Author, blog.updateStatus);
router.get("/category/:category", Authentication, blog.showPostByCategory);



router.get("/search", blog.searchByTitle);
module.exports = router;