import { Router } from 'express';
import { acceptRequest,cancelRequest,completedRequest } from '../controllers/workrequest.controller.js';

const router = Router()


router.route('/accept').put(
    acceptRequest
)
router.route('/cancel').delete(
    cancelRequest
)
router.route('/completed').put(
    completedRequest
)

export default router;
