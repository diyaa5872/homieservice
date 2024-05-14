import { Router } from 'express';
import { combinedHandler } from "../controllers/booking.controller.js"

const router = Router()
router.route('/bookandrequest/:user_id/:worker_id').post(
    combinedHandler
)

export default router;
