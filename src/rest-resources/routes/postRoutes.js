import express from 'express';
import commentRoutes from "./commentRoutes.js";
const router = express.Router();
import {
    storePost,
    showAll,
    updatePost,
    deletePosts,
    showSinglePost,
    updateStatusPost,
    showByCategory,
    searchByTitle
} from "../controllers/postController.js";
import likeController from "../controllers/likeController.js";
import { authenticateToken, authorizeRole } from '../middleware/jwtAuth.js';


router.post(
    "/create",
    authenticateToken,
    authorizeRole(['author', 'user']),
    storePost
);

router.get(
    "/show",
    showAll
);

router.get(
    "/show/:slug",
    showSinglePost
);
router.get(
    "/search",
    searchByTitle
);


router.put(
    "/:slug",
    authenticateToken,
    authorizeRole(['author', 'user']),
    updatePost
);

router.patch(
    "/:slug/status",
    authenticateToken,
    authorizeRole(['author', 'user']),
    updateStatusPost
);

router.delete(
    "/:slug",
    authenticateToken,
    authorizeRole(['author', 'user']),
    deletePosts
);

router.get(
    "/category/:category",
    showByCategory
);


router.post(
    "/:id/like",
    authenticateToken,
    likeController.toggleLike
);

router.get(
    "/:slug/count",
    likeController.getLikes
);

router.use("/:postId/comments", commentRoutes);


export default router;
