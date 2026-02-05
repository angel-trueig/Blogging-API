import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middleware/jwtAuth.js';
import {
    subscribeAuthor,
    unsubscribeAuthor,
    getMySubscriptions,
    getAuthorSubscribers
} from "../controllers/subscriptionController.js";

router.post("/authors/:authorId/subscribe", authenticateToken, subscribeAuthor);

router.delete("/authors/:authorId/unsubscribe", authenticateToken, unsubscribeAuthor);

router.get("/me/subscriptions", authenticateToken, getMySubscriptions);

router.get("/authors/:authorId/subscribers", authenticateToken, getAuthorSubscribers);

export default router;
