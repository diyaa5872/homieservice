import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middlewares.js';

const router = Router();

router.route('/register').post(
    upload.single('cover_image'), //now can send image
    registerUser
);

export default router;
