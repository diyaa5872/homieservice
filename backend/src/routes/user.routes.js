import { Router } from 'express';
import {addressUser,getCurrentUser, loginUser, logoutUser, registerUser,updateAccountDetails,changeCurrentPassword,addAddress,updateUserCoverImage } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { refreshAccessToken } from '../controllers/user.controller.js';

const router = Router()

router.route('/register').post(
    registerUser
);
router.route('/addressUser/:userId').post(
    addressUser
);

router.route('/login').post(//chnaged post to get
    loginUser
)

router.route('/getCurrentUser').post(
    getCurrentUser
)

router.route('/updateAccountDetails').post(
    updateAccountDetails
)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

//secured routes
router.route('/logout').post(verifyJWT , logoutUser)

router.route('/refresh-token').post(refreshAccessToken)

export default router;
