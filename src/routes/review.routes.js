import { Router } from 'express';
import { createReview,deleteReview } from '../controllers/review.controller.js'

const router = Router()
router.route('/create-review/:userId/:workerId').post(
    createReview
)

router.route('/delete-review').delete(
    deleteReview
)

export default router;
