import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { refreshAccessToken } from '../controllers/user.controller.js';

const router = Router()

router.route('/register').post(
    upload.single('coverImage'), //now can send image
    registerUser
);

router.route('/login').post(//post as we are taking info
    loginUser
)

//secured routes
router.route('/logout').post(verifyJWT , logoutUser)

router.route('/refresh-token').post(refreshAccessToken)

export default router;
