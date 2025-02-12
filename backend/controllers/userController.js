
import { User } from "../models/userModel.js";
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

    const filteredUsers = allUsers.filter((user) => !user._id.equals(userId));
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
    const user = await User.findById(userId);
    if (!user) {
      res.status(403).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "user details retrieved successfully",
      success: true,
      user : user
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// update user details

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, username } = req.body;

    // Ensure at least one field is provided for update
    if (!firstName && !lastName && !username) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided for update",
      });
    }

    // Find and update the user in one step
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { firstName, lastName, username } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: {
        userId: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};






export {getUserInfoById,getUsersOfSystem,updateUserDetails}