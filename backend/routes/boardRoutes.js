import { Router } from "express";
import {
  assignUserToBoard,
  createBoard,
  createBoardWithMembers,
  deleteBoardById,
  getBoardDetails,
  getBoardsForUser,
  removeUserFromBoard,
} from "../controllers/boardController.js";

const router = Router();

router.route("/createBoard").post(createBoard);
router.route("/createBoardWithMembers").post(createBoardWithMembers);
router.route("/:boardId").get(getBoardDetails);
router.route("/assignUser").post(assignUserToBoard);
router.route("/removeUser").post(removeUserFromBoard);
router.route("/:boardId").delete(deleteBoardById);
router.get("/getBoardsForUser/:userId", getBoardsForUser);

export default router;
