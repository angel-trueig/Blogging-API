import express from 'express';
const router = express.Router();
import loginController from '../controllers/loginController.js';

router.route("/")
    .post(loginController.loginPost);

export default router;
