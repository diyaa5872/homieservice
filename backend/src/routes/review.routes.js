import { Router } from 'express';
import { createReview,deleteReview } from '../controllers/review.controller.js'

const router = Router()
router.route('/create-review/:user_id/:worker_id').post(
    createReview
)

router.route('/delete-review/:review_id').delete(
    deleteReview
)

export default router;
