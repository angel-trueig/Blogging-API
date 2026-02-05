import express from "express";
const router = express.Router();
import { getAuthorRankingController } from "../controllers/authorRankingController.js";

router.get(
    "/ranking",
    getAuthorRankingController
);

export default router;