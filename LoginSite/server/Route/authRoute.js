import express from 'express';
import { registerUser,loginUser, logoutUser, sendVerificationOtp, verifyOtp, sendResetOTP, resetPassword, isAuthenticated} from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Register route

router.post('/register', registerUser);
// Login route
router.post('/login', loginUser);
// Logout route
router.post('/logout', logoutUser);

// Verification route
router.post('/send-verify-otp', userAuth, sendVerificationOtp);
router.post('/verify-account', userAuth, verifyOtp)
router.get('/is-auth', userAuth, isAuthenticated)


// Reset Password route
router.post('/send-reset-otp',sendResetOTP)
router.post('/reset-password', resetPassword);

export default router;