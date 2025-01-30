import { Roles } from "../constants/Roles";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

const getUsersOfSystem = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        msg: "User not found",
        success: false,
      });
    }
    // all users in database
    const allUsers = await User.find({});

    const filteredUsers = User.filter((user) => !user._id.equals(userId));
    res
      .status(200)
      .json({
        message: "Users in the system",
        users: filteredUsers,
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get user by id
const getUserInfoById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = User.findById(userId);
    if (!user) {
      res.status(403).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(400).json({
      message: "user details retrieved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// update user details
const updateUserDetails = async (req,res,next)=>{
    try{
    const id = req.params;
    const {username,email,password} = req.body
    const user = User.findById(user)
    if(!user){
        res.status(403).json({
            message:"User not found",
            success:false
        })
    }
    if(username) user.username=username
    if(email) user.email=email
    if(password){
         const hashedpassword = await bcrypt.hash(password,12);
         user.password=hashedpassword;
    }
    const updatedUser = await user.save();

    res.status(200).json({
        message:"User details updated successfully",
        success:true,
        user:{
            username:updatedUser.username,
            email:updatedUser.email
        },
    })
}
  catch(error){
    res.status(500).json({
    message: 'An error occurred while updating the user',
    success: false,
    error: error.message,
  })
}
}

export {getUserInfoById,getUsersOfSystem,updateUserDetails}