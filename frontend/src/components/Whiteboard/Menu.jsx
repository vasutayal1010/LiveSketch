import React, { useState } from "react";
import rectangleIcon from "./../../resources/icons/rectangle.svg";
import lineIcon from "./../../resources/icons/line.svg";
import rubberIcon from "./../../resources/icons/rubber.svg";
import pencilIcon from "./../../resources/icons/pencil.svg";
import textIcon from "./../../resources/icons/text.svg";
import selectionIcon from "./../../resources/icons/selection.svg";
import circleIcon from "./../../resources/icons/circle.svg";
import { toolTypes } from "./../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setElements, setToolType } from "./whiteboardSlice";
import {
  disconnectSocketConnection,
  emitClearWhiteboard,
} from "../../socketConnection/socketConn";

import {
  Button,
  Divider,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack,
  Info,
  AccessTime,
  Dashboard,
  Person,
  Bookmark,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchBoardInfo } from "../../services/apiService";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CustomIconButton = ({ src, type, isRubber }) => {
  const dispatch = useDispatch();
  const selectedToolType = useSelector((state) => state.whiteboard.tool);

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  const handleClearCanvas = () => {
    dispatch(setElements([]));
    emitClearWhiteboard();
  };

  return (
    <button
      onClick={isRubber ? handleClearCanvas : handleToolChange}
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
    >
      <img width="80%" height="80%" src={src} alt={`${type} icon`} />
    </button>
  );
};

const Menu = ({ canvasRef }) => {
  const navigate = useNavigate();
  const boardMembers = useSelector((state) => state.whiteboard.activeUsers);

  const [openBoardDetails, setOpenBoardDetails] = useState(false);
  const [openActiveMembers, setOpenActiveMembers] = useState(false);
  const [boardInfo, setBoardInfo] = useState(null);

  const handleClickOpenBoardInfo = async () => {
    try {
      const response = await fetchBoardInfo(localStorage.getItem("boardId"));
      console.log(response);
      setBoardInfo(response.board);
      setOpenBoardDetails(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseBoardInfo = () => {
    setOpenBoardDetails(false);
  };

  const handleAvatarIconsClick = () => {
    setOpenActiveMembers(true);
  };

  const handleActiveIconsClose = () => {
    setOpenActiveMembers(false);
  };

  const handleBackButtonClick = () => {
    disconnectSocketConnection();
    localStorage.removeItem("boardId");
    navigate("../../whiteboards");
  };

  // Function to export canvas to an image
  const exportToImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas-image.png";
    link.click();
  };

  // Function to export canvas to a PDF
  const exportToPDF = () => {
    const canvas = canvasRef.current;
    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("canvas.pdf");
    });
  };

  // Function to format date string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="menu_container">
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBackButtonClick}
        >
          Back
        </Button>

        <CustomIconButton
          className="ml-20"
          src={rectangleIcon}
          type={toolTypes.RECTANGLE}
        />
        <CustomIconButton src={circleIcon} type={toolTypes.CIRCLE} />
        <CustomIconButton src={lineIcon} type={toolTypes.LINE} />
        <CustomIconButton src={rubberIcon} isRubber />
        <CustomIconButton src={pencilIcon} type={toolTypes.PENCIL} />
        <CustomIconButton src={textIcon} type={toolTypes.TEXT} />
        <CustomIconButton src={selectionIcon} type={toolTypes.SELECTION} />

        <IconButton
          onClick={exportToImage}
          color="primary"
          aria-label="export to image"
        >
          <ImageIcon />
        </IconButton>
        <IconButton
          onClick={exportToPDF}
          color="secondary"
          aria-label="export to pdf"
        >
          <PictureAsPdfIcon />
        </IconButton>

        <Button
          variant="contained"
          startIcon={<Info />}
          onClick={handleClickOpenBoardInfo}
        >
          Info
        </Button>

        <AvatarGroup max={4} onClick={handleAvatarIconsClick}>
          {boardMembers.map((member, index) => (
            <Avatar alt={member.firstName} key={index}>
              {member.firstName.charAt(0)}
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      {boardInfo && (
        <Dialog
          open={openBoardDetails}
          onClose={handleCloseBoardInfo}
          maxWidth="sm"
          PaperProps={{
            sx: { borderRadius: 1 },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Dashboard color="primary" />
            <Typography variant="h6">Board Information</Typography>
          </DialogTitle>

          <DialogContent sx={{ padding: 3, paddingTop: 3 }}>
            {/* Board Title and Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Board Name
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
                {boardInfo.boardTitle}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {boardInfo.boardDescription || "No description available."}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Time Information */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
                Timeline
              </Typography>

              <Box sx={{ display: "flex", gap: 4, mb: 1 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatDate(boardInfo.createdAt)}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatDate(boardInfo.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Members Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
                Members ({boardInfo.members.length})
              </Typography>

              <List
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  overflow: "auto",
                  backgroundColor: "#fafafa",
                  borderRadius: 1,
                  border: "1px solid #eeeeee",
                }}
              >
                {boardInfo.members.map((member, index) => (
                  <ListItem
                    key={index}
                    divider={index !== boardInfo.members.length - 1}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.memberId}
                      secondary={
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="body2" component="span">
                            Role:{" "}
                            <Box component="span" sx={{ fontWeight: 500 }}>
                              {member.memberRole}
                            </Box>
                          </Typography>
                          <Typography variant="body2" component="span">
                            Last Access: {formatDate(member.lastAccessedAt)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              padding: 2,
              backgroundColor: "#f5f5f5",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button onClick={handleCloseBoardInfo} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openActiveMembers}
        onClose={handleActiveIconsClose}
        aria-labelledby="active-members-dialog-title"
      >
        <DialogTitle id="active-members-dialog-title">
          Active Members
        </DialogTitle>
        <DialogContent>
          {boardMembers &&
            boardMembers.map((member, index) => (
              <Typography
                key={index}
                variant="body2"
                color="textPrimary"
                component="div"
                style={{ marginTop: 1 }}
              >
                {member.email} | {member.username} | {member.firstName} |{" "}
                {member.lastName}
              </Typography>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActiveIconsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
