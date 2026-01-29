
const router = require("express").Router({ mergeParams: true });


const commentController = require("../controllers/commentController");
const { Authentication, Author } = require("../middleware/auth.js");

router.post("/", Authentication, commentController.addComment);
router.get("/:blogId", commentController.getBlogComment);
router.put("/:id", Authentication, commentController.editComment);
router.delete("/:id", Authentication, commentController.deleteComment);

module.exports = router;
