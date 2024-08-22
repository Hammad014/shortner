import express from 'express';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); 
router.post('/reset-password-request', requestPasswordReset); // Route to request a password reset
router.post('/reset-password', resetPassword); // Route to reset the password

export default router;
