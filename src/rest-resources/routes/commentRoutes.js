import express from 'express';
const router = express.Router({ mergeParams: true });

import { authenticateToken } from '../middleware/jwtAuth.js';
import { addComment, deleteCommentPost, editCommentPost, getPostComment, addReply } from "../controllers/commentController.js";

router.post("/", authenticateToken, addComment);
router.get("/", getPostComment);
router.put("/:id", authenticateToken, editCommentPost);
router.delete("/:id", authenticateToken, deleteCommentPost);

router.post("/:commentId/reply", authenticateToken, addReply);

export default router;
