import { User } from "../models/userModel";
import { Board } from "../models/boardModel";
import { Roles } from "../constants/Roles";

const createBoard = async (req,res,next)=>{
    try{
    const {boardTitle,boardDescription} = req.body;
    const user = await User.findById(req.userId);
     if(!user){
        res.status().json({
            message:"User doesnot exist",
            success:false
        })
     }
     const boardMembers = [{
        memberId: req.userId,
        memberRole:'OWNER',
        lastAccessedDate:NULL
    }]
     const newBoard = Board.create({
        boardTitle,
        boardDescription,
        createdBy:req.userId,
        boardMembers
     })
    res.staust(200).json({
        message:"Board created successfully",
        success:true,
        board:savedBoard,
    })
    }
    catch(error){
        res.status(500).json({
            message: 'Failed to create board',
            success: false,
            error: error.message,
          });
    }
    
}