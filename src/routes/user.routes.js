import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middlewares.js';

const router = Router();

router.route('/register').post(
    upload.single('cover_image'), //now can send image
    registerUser
);

router.route('/login').post(//post as we are taking info
    loginUser
)

//secured routes
router.route('/logout').post(verifyJWT , logoutUser)

export default router;
