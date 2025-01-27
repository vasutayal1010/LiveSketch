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
        const collaborators = [{
            collaboratorId: req.userId,
            collaboratorRole: 'OWNER',
            lastAccessedDate: NULL
        }]
        const newBoard = Board.create({
            boardTitle,
            boardDescription,
            createdBy: req.userId,
            collaborators
        })
        res.status(200).json({
            message: "Board created successfully",
            success: true,
            board: savedBoard,
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
        const { boardTitle, boardDescription, collaborators } = req.body;
        // const user = await User.findById(req.userId);
        let collaboratorsObj = []

        for (let i = 0; i < collaborators.size(); i++) {
            collaboratorsObj.push({
                collabpratorId: collaborators[i].collaboratorId,
                collaboratorRole: collaborators[i].role,
                lastAccessedDate: null
            })
        }
        const board = await Board.create({
            boardTitle,
            boardDescription,
            collaborators: collaboratorsObj
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
            .populate('createdBy', 'username email')
            .populate('collaborators', 'username email')
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
const getCollaborators = async (req, res, next) => {
    try {
        const boardId = req.params
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }
        const board = await Board.findById(boardId).populate('collaborators', 'username email');
        if (!board) {
            res.status(404).json({
                message: "Board does not exist",
                success: false
            })
        }

        res.status(200).json({
            message: "Collaborators fetched successfully",
            success: true,
            collaborators: board.collaborators
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

const addCollaborator = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({
                message: "Invalid boardId",
                success: false
            });
        }

        const { collaboratorId, role } = req.body;
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
        const collaborator = await User.findById(collaboratorId)
        if (!collaborator) {
            return res.status(404).json({
                message: 'Collaborator not found',
                success: false,
            });
        }
        if (board.collaborators.includes(collaboratorId)) {
            return res.status(400).json({
                message: 'User is already a collaborator on this board',
                success: false,
            });
        }
        board.collaborators.push({
            collaboratorId,
            collaboratorRole: role || 'VIEWER',
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
  
      if (board.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({
          message: "You are not authorized to remove a user",
          success: false,
        });
      }
  
      const collaboratorIndex = board.collaborators.findIndex(
        (collaborator) => collaborator.collaboratorId.toString() === idTobeRemoved.toString()
      );
  
      if (collaboratorIndex === -1) {
        return res.status(404).json({
          message: "User not found in collaborators",
          success: false,
        });
      }
  
      board.collaborators.splice(collaboratorIndex, 1);
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
        'collaborators.collaboratorId':userId
    })
    const allBoards = boardsOfCurrentUser.map((board)=>{
        const collaborator = board.collaborators.find(m=>m.collaboratorId===userId);
        return {
            ...board._doc,
            role:collaborator?collaborator.collaboratorRole:'N/A',
            lastAccessedDate:collaborator?collaborator.lastAccessedDate:null
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
    getCollaborators,
    addCollaborator,
    removeUserFromBoard,
  };