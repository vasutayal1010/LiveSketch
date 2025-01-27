import { Router } from "express";
import {
  getUsersOfSystem,
  getUserInfoById,
  updateUserDetails,
} from "../controllers/userController";

const router = Router();
router.route("/getUsersOfSystem/:userId").get(getUsersOfSystem);
router.route("/:userId").get(getUserInfoById);
router.route('/updateUserDetails/:userId').put(updateUserDetails);



export default router;