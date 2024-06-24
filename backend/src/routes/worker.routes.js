import { Router } from 'express';
import {addimages,addextradetails,addotherdetails,bookingdetails, requeststrueforWorker,requestsforWorker,getThatWorker,getAllWorkers, registerWorker, loginWorker , logoutWorker , changeCurrentPassword , getCurrentUser , updateAccountDetails , updateUserCoverImage , updateUserShopPictures, deleteShopPictures } from '../controllers/worker.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { refreshAccessToken } from '../controllers/worker.controller.js';

const router = Router()

router.route('/register').post(
    // upload.single('coverImage'), //now can send image
    // upload.fields([
    //     { name: 'shopPictures', maxCount: 5 }
    // ]),
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

router.route("/working").get(
    getAllWorkers
);

router.route("/work").get(
    getThatWorker
);

router.route("/requestforworker").get(
    requestsforWorker
);
router.route("/requesttrueforworker").get(
    requeststrueforWorker
);

router.route("/bookingdetails").get(
    bookingdetails
);

router.route("/addaddress").put(
    addotherdetails
);

// router.route("/addextradetails").put(
//     addextradetails
// );

// router.route("/addimages").put(
//     upload.single('coverImage'), //now can send image
//     addimages
// );

export default router;
