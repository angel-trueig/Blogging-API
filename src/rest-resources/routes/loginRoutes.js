import express from 'express';
const router = express.Router();
import userLoginPost from '../controllers/login/userLoginController.js';
import authorLoginPost from '../controllers/login/authorLoginController.js';

router.route("/user")
    .post(userLoginPost);

router.route("/author")
    .post(authorLoginPost);

export default router;
