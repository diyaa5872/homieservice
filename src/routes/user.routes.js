import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js'

const router=Router();

router.route('/register').post(registerUser)//now registerUser is in user.controller.js

export default router;
