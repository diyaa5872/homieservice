import { Router } from 'express';
import { userOtp } from '../controllers/otp.controller.js';

const router = Router();

// Define the route directly using Router.post()
router.post('/generatingotp', userOtp);

export default router;