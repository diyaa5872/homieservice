import { Router } from 'express';
import {  registerWorker } from '../controllers/worker.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
// import { refreshAccessToken } from '../controllers/worker.controller.js';

const router = Router()

router.route('/register').post(
    upload.single('coverImage'), //now can send image
    upload.fields([
        { name: 'shopPictures', maxCount: 5 }
    ]),
    registerWorker
);


export default router;
