import { Router } from 'express';
import { combinedHandler } from "../controllers/booking.controller.js"

const router = Router()
router.route('/bookandrequest').post(
    combinedHandler
)

export default router;
