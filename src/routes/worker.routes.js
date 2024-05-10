import { Router } from 'express';
import { registerWorker, loginWorker , logoutWorker , changeCurrentPassword , getCurrentUser , updateAccountDetails , updateUserCoverImage , updateUserShopPictures, deleteShopPictures } from '../controllers/worker.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { refreshAccessToken } from '../controllers/worker.controller.js';

const router = Router()

router.route('/register').post(
    upload.single('coverImage'), //now can send image
    upload.fields([
        { name: 'shopPictures', maxCount: 5 }
    ]),
    registerWorker
);

router.route('/login').post(
    loginWorker
);

router.route('/logout').post(verifyJWT , logoutWorker)

router.route('/refresh-token').post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/shop-pictures").patch(verifyJWT, upload.single("shopPictures"), updateUserShopPictures)

router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.delete("/shop-pictures", verifyJWT, deleteShopPictures);

export default router;
