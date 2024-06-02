import { Router } from 'express';
import {addanotheraddress,updateemailandfullname,getCurrentUser,getThatUser, loginUser, logoutUser, registerUser,updateAccountDetails,changeCurrentPassword,addAddress,updateUserCoverImage } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { refreshAccessToken } from '../controllers/user.controller.js';

const router = Router()

router.route('/register').post(
    registerUser
);

router.route('/login').post(//changed post to get
    loginUser
);

router.route('/updateAccountDetails').post(
    updateAccountDetails
)
router.route('/addaddress').put(
    addAddress
)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/getCurrentUser").get(verifyJWT, getCurrentUser)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

//secured routes
router.route('/logout').post(verifyJWT , logoutUser)

router.route('/refresh-token').post(refreshAccessToken)

router.route('/getThatUser').get(getThatUser)

router.route('/updateemail').put(
    updateemailandfullname
)
router.route('/addanotheraddress').put(
    addanotheraddress
)

export default router;
