import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EditBoardDialog from "./EditBoardDialog";
import ConfirmationModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";
import { deleteBoardById } from "../services/apiService";

const BoardItem = ({
  boardId,
  name,
  description,
  role,
  memberCnt,
  lastAccessedAt,
}) => {
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const [openOpenBoardConfirmDialog, setOpenOpenBoardConfirmDialog] =
    useState(false);

  const handleEditClick = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);
  const handleOpenBoard = () => setOpenOpenBoardConfirmDialog(true);
  const handleOpenBoardConfirm = () => {
    localStorage.setItem("boardId", boardId);
    navigate(`../whiteboard/${boardId}`);
  };

  const handleDeleteBoard = () => setOpenDeleteConfirmDialog(true);
  const handleDeleteClose = () => setOpenDeleteConfirmDialog(false);

  const handleDeleteBoardConfirm = async () => {
    try {
      await deleteBoardById(boardId);
      window.location.reload();
      setOpenDeleteConfirmDialog(false);
    } catch (error) {
      console.error(`Error while deleting board: ${error}`);
    }
  };

  const handleCloseOpenBoardDialog = () => setOpenOpenBoardConfirmDialog(false);

  return (
    <Box className="flex justify-center p-3 w-full md:w-1/2 lg:w-1/3">
      <Card className="w-full max-w-md shadow-md rounded-xl hover:shadow-lg transition duration-300 border border-gray-200">
        <CardContent className="p-6">
          <Typography variant="h6" className="font-bold text-center mb-2">
            {name}
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 text-center mb-4"
          >
            {description}
          </Typography>

          <Divider className="my-3" />

          <Box className="flex flex-col space-y-2 text-sm text-gray-600">
            <Typography>
              <span className="font-semibold">Role:</span> {role}
            </Typography>
            <Typography>
              <span className="font-semibold">Members:</span> {memberCnt}
            </Typography>
            <Typography>
              <span className="font-semibold">Last accessed at:</span>{" "}
              {lastAccessedAt
                ? new Date().toDateString()
                : "You haven't accessed yet."}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} className="mt-5 justify-center">
            {(role === "EDITOR" || role === "OWNER") && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteBoard}
                sx={{ px: 3, py: 1 }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleOpenBoard}
              sx={{ px: 3, py: 1 }}
            >
              Open
            </Button>
            {(role === "EDITOR" || role === "OWNER") && (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
                sx={{ px: 3, py: 1 }}
              >
                Edit
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Modals */}
      <EditBoardDialog
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
      />
      <ConfirmationModal
        open={openDeleteConfirmDialog}
        title="Delete Confirmation"
        content="Are you sure you want to delete this board?"
        onConfirm={handleDeleteBoardConfirm}
        onClose={handleDeleteClose}
      />
      <ConfirmationModal
        open={openOpenBoardConfirmDialog}
        title="Open Board Confirmation"
        content="Are you sure you want to open this board?"
        onConfirm={handleOpenBoardConfirm}
        onClose={handleCloseOpenBoardDialog}
      />
    </Box>
  );
};

export default BoardItem;
