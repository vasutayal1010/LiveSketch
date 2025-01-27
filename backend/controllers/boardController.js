import { User } from "../models/userModel";
import { Board } from "../models/boardModel";

const createBoard = async (req, res, next) => {
  try {
    const { boardTitle, boardDescription } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      res.status().json({
        message: "User doesnot exist",
        success: false,
      });
    }
    const members = [
      {
        memberId: req.userId,
        memberRole: "OWNER",
        lastAccessedDate: NULL,
      },
    ];
    const newBoard = Board.create({
      boardTitle,
      boardDescription,
      //createdBy: req.userId,
      members,
    });
    console.log(`Board created with details: ${newBoard}`);
    res.status(200).json({
      message: "Board created successfully",
      success: true,
      board: newBoard,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create board",
      success: false,
      error: error.message,
    });
  }
};

//create board with members
const createBoardWithMembers = async (req, res, next) => {
  try {
    const { boardTitle, boardDescription, members } = req.body;
    // const user = await User.findById(req.userId);
    let membersObj = [];

    for (let i = 0; i < members.size(); i++) {
      membersObj.push({
        memberId: members[i].memberId,
        memberRole: members[i].role,
        lastAccessedDate: null,
      });
    }
    const board = await Board.create({
      boardTitle,
      boardDescription,
      members: membersObj,
    });
    console.log(`Board created with details: ${board}`);
    res.status(200).json({
      message: "Board created with collaborators successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create board",
      success: false,
      error: error.message,
    });
  }
};

// get board by id

const getBoardDetails = async (req, res, next) => {
  try {
    const boardId = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        message: "Invalid boardId",
        success: false,
      });
    }

    const board = await Board.findById(boardId)
      //.populate('createdBy', 'username email')
      .populate("members", "username email");
    if (!board) {
      res.status(404).json({
        message: "Board doesnot exist",
        success: false,
      });
    }
    res.status(200).json({
      message: "Board retrieved successfully",
      success: true,
      boardDetails: board,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve board",
      success: false,
      error: error.message,
    });
  }
};

// delete board by id
const deleteBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        message: "Invalid boardId",
        success: false,
      });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      res.status(404).json({
        message: "Board does not exist",
        success: false,
      });
    }
    const deletedBoard = await Board.findByIdAndDelete(boardId);
    res.status(200).json({
      message: "Board deleted successfully",
      success: true,
      deletedBoard,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// get board members using boardid
const getMembers = async (req, res, next) => {
  try {
    const boardId = req.params;
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        message: "Invalid boardId",
        success: false,
      });
    }
    const board = await Board.findById(boardId).populate(
      "members",
      "username email"
    );
    if (!board) {
      res.status(404).json({
        message: "Board does not exist",
        success: false,
      });
    }

    res.status(200).json({
      message: "Memebers fetched successfully",
      success: true,
      members: board.members,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// add collaborator

const assignUserToBoard = async (req, res, next) => {
  try {
    const { boardId, userId, role } = req.body;

    console.log(`${boardId} ${userId} ${role}`);

    const [board, user] = await Promise.all([
      Board.findById(boardId),
      User.findById(userId),
    ]);

    if (!board || !user) {
      return res.status(404).json({
        message: "Passed boardID or userId is invalid",
        success: false,
      });
    }

    const isAlreadyMapped = board.members.some((member) =>
      member.memberId.equals(user._id)
    );

    console.log(`isAlreadyMapped : ${isAlreadyMapped}`);
    if (isAlreadyMapped) {
      return res.status(202).json({
        message: "User is already mapped with board",
        success: true,
      });
    }

    board.members.push({
      memberId: userId,
      memberRole: role.toUpperCase(),
      lastAccessedAt: null,
    });

    console.log(board.members);

    const updatedBoard = await Board.findByIdAndUpdate(board._id, board, {
      new: true,
    });

    console.log(`updated board : ${updatedBoard}`);

    res
      .status(200)
      .json({ message: "User mapped to board successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// removing user from a board
const removeUserFromBoard = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const { idTobeRemoved } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        message: "Invalid board ID",
        success: false,
      });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        message: "Board not found",
        success: false,
      });
    }

    //   if (board.createdBy.toString() !== userId.toString()) {
    //     return res.status(403).json({
    //       message: "You are not authorized to remove a user",
    //       success: false,
    //     });
    //   }

    const memberIndex = board.members.findIndex(
      (member) => member.memberId.toString() === idTobeRemoved.toString()
    );

    if (memberIndex === -1) {
      return res.status(404).json({
        message: "User not found in collaborators",
        success: false,
      });
    }

    board.members.splice(memberIndex, 1);
    await board.save();

    res.status(200).json({
      message: "User removed successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while removing the user",
      success: false,
      error: error.message,
    });
  }
};

// to retrieve all the board user was a collborator , either admin or viewer
const getBoardsForUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(403).json({
        message: "Invalid user id",
        success: false,
      });
    }
    const boardsOfCurrentUser = await Board.find({
      "members.memberId": userId,
    });
    const allBoards = boardsOfCurrentUser.map((board) => {
      const member = board.members.find((m) => m.memberId === userId);
      return {
        ...board._doc,
        role: member ? member.memberRole : "N/A",
        lastAccessedDate: member ? member.lastAccessedDate : null,
      };
    });
    res.status(200).json({
      message: "Boards for user retrieved successfully",
      boards: allBoards,
      boardCount: allBoards.length,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export {
  createBoard,
  createBoardWithMembers,
  getBoardDetails,
  deleteBoardById,
  getMembers,
  assignUserToBoard,
  removeUserFromBoard,
  getBoardsForUser,
};
