import express from 'express';
const router = express.Router();
import signupController from '../controllers/signupController.js';

router.route("/")
    .post(signupController.signupPost);

export default router;