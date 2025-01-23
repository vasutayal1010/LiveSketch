import { Router } from "express";
import { resetPasswordForUser, SignIn, SignUp } from "../controllers/authController.js";


const router = Router();

router.route('/signup').post(SignUp);
router.route('/signin').post(SignIn,SignIn);   
router.route('/resetpassword/:userId').patch(resetPasswordForUser); 

export default router;