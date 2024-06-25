import { Router } from 'express';
import { acceptRequest,cancelRequest,completedRequest,findrequests } from '../controllers/workrequest.controller.js';

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
router.route('/requestsuser').get(
    findrequests
)

export default router;
