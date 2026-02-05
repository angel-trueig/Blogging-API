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
    searchByTitle,
    getRecentPosts,
    getTrendingPosts
} from "../controllers/postController.js";
import likeController from "../controllers/likeController.js";
import { authenticateToken, authorizeRole } from '../middleware/jwtAuth.js';


router.post(
    "/create",
    authenticateToken,
    authorizeRole(['author']),
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
    "/:slug",//id
    authenticateToken,
    authorizeRole(['author']),
    updatePost
);

router.patch(
    "/:slug/status",
    authenticateToken,
    authorizeRole(['author']),
    updateStatusPost
);

router.delete(
    "/:slug",
    authenticateToken,
    authorizeRole(['author']),
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
    "/:id/count",
    likeController.getLikes
);

router.get('/stats/recent', authenticateToken, getRecentPosts);
router.get('/stats/trending', authenticateToken, getTrendingPosts);

router.use("/:postId/comments", commentRoutes);


export default router;
