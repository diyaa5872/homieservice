import { Router } from 'express';
import { userOtp,verifyOTP } from '../controllers/otp.controller.js';

const router = Router();

// Define the route directly using Router.post()
router.post('/generatingotp', userOtp);
router.post('/verifyingotp',verifyOTP );

export default router;