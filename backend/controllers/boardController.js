import { User } from "../models/userModel";
import { Board } from "../models/boardModel";
import { Roles } from "../constants/Roles";

const createBoard = async (req, res, next) => {
    try {
        const { boardTitle, boardDescription } = req.body;
        const user = await User.findById(req.userId);
        if (!user) {
            res.status().json({
                message: "User doesnot exist",
                success: false
            })
        }
        const members = [{
            memberId: req.userId,
            memberRole: 'OWNER',
            lastAccessedDate: NULL
        }]
        const newBoard = Board.create({
            boardTitle,
            boardDescription,
            //createdBy: req.userId,
            members
        })
        res.status(200).json({
            message: "Board created successfully",
            success: true,
            board: newBoard,
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create board',
            success: false,
            error: error.message,
        });
    }

}

//create board with members
const createBoardWithMembers = async (req, res, next) => {
    try {
        const { boardTitle, boardDescription, members } = req.body;
        // const user = await User.findById(req.userId);
        let membersObj = []

        for (let i = 0; i < members.size(); i++) {
            membersObj.push({
                memberId: members[i].memberId,
                memberRole: members[i].role,
                lastAccessedDate: null
            })
        }
        const board = await Board.create({
            boardTitle,
            boardDescription,
            members: membersObj
        })
        res.status(200).json({
            message: "Board created with collaborators successfully",
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to create board',
            success: false,
            error: error.message,
        });
    }
}

// get board by id

const getBoardbyId = async (req, res, next) => {
    try {
        const boardId = req.params

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const board = await Board.findById(boardId)
            //.populate('createdBy', 'username email')
            .populate('members', 'username email')
        if (!board) {
            res.status(404).json({
                message: "Board doesnot exist",
                success: false
            })
        }
        res.status(200).json({
            message: "Board retrieved successfully",
            success: true,
            boardDetails: board
        })

    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve board',
            success: false,
            error: error.message,
        });
    }
}


// delete board by id
const deleteBoardById = async (req, res, next) => {
    try {
        const boardId = req.params
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }
        const board = await Board.findById(boardId);
        if (!board) {
            res.status(404).json({
                message: "Board does not exist",
                success: false
            })
        }
        const deletedBoard = await Board.findByIdAndDelete(boardId)
        res.status(200).json({
            message: "Board deleted successfully",
            success: true,
            deletedBoard
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message,
        });
    }
}

// get board members using boardid
const getMembers = async (req, res, next) => {
    try {
        const boardId = req.params
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }
        const board = await Board.findById(boardId).populate('members', 'username email');
        if (!board) {
            res.status(404).json({
                message: "Board does not exist",
                success: false
            })
        }

        res.status(200).json({
            message: "Memebers fetched successfully",
            success: true,
            members: board.members
        })
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message,
        });
    }
}

// add collaborator

const addMember = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const { memberId, role } = req.body;
        const userId = req.userId;

        const board = await Board.findById(boardId)

        if (!board) {
            res.status(404).json({
                message: "Board does not exist",
                success: false
            })
        }
        // to check if user is the creator of the board ==> because only user can add other to board
        if (userId.toString() !== board.createdBy.toString()) {
            res.status(403).json({
                message: "You are not authorized to add board members",
                success: false,
            })
        }
        const member = await User.findById(memberId)
        if (!member) {
            return res.status(404).json({
                message: 'Member not found',
                success: false,
            });
        }
        if (board.members.includes(collaboratorId)) {
            return res.status(400).json({
                message: 'User is already a collaborator on this board',
                success: false,
            });
        }
        board.members.push({
            memberId,
            memberRole: role || 'VIEWER',
            lastAccessedDate: null
        })
        await board.save();
        res.status(200).json({
            message: 'Collaborator added successfully',
            success: true,
            board,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the collaborator',
            success: false,
            error: error.message,
        });
    }
}

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
  }


// to retrieve all the board user was a collborator , either admin or viewer
const getBoardsOfUser = async (req,res,next)=>{
    const userId = req.userId
    try{
    const user = await User.findById(userId)
    if(!user){
        res.status(403).json({
            message:"Invalid user id",
            success:false
        })
    }
    const boardsOfCurrentUser = await Board.find({
        'members.memberId':userId
    })
    const allBoards = boardsOfCurrentUser.map((board)=>{
        const member = board.members.find(m=>m.memberId===userId);
        return {
            ...board._doc,
            role:member?member.memberRole:'N/A',
            lastAccessedDate:member?member.lastAccessedDate:null
        }
    })
    res.status(200).json({
        message: 'Boards for user retrieved successfully',
        boards: allBoards,
        boardCount: allBoards.length,
        success: true
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
}

export {
    createBoard,
    createBoardWithMembers,
    getBoardbyId,
    deleteBoardById,
    getMembers,
    addMember,
    removeUserFromBoard,
  };