import express from 'express';
import { LoginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/Login', LoginUser);
router.post('/Register', registerUser);

export default router;