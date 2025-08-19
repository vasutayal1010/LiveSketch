import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllUsersForSystem,
  createBoardWithMembers,
} from "../services/apiService";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Alert,
  Snackbar,
  Chip,
  Avatar,
  Box,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  GroupAdd,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

const CreateNewBoard = ({ canBtnHandler }) => {
  const userId = localStorage.getItem("userId");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [addedMembers, setAddedMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchAllUsersForSystem(userId);
        setAllUsers(responseData.users);
      } catch (error) {
        console.error(`Error loading users: ${error}`);
        showNotification("Error loading users", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ... (keep existing handler functions)
  
    const showNotification = (message, type = "success") => {
      setNotification({ show: true, message, type });
    };
  
    const handleRoleChange = (userId, role) => {
      const user = allUsers.find((user) => user._id === userId);
      setSelectedUser({ ...user, role });
    };
  
    const handleAddMember = () => {
      if (selectedUser) {
        setAddedMembers((prev) => [...prev, selectedUser]);
        setAllUsers((prev) =>
          prev.filter((user) => user._id !== selectedUser._id)
        );
        setSelectedUser(null);
      } else {
        showNotification("Please select a role before adding a member", "error");
      }
    };
  
    const handleRemoveMember = (userId) => {
      const removedUser = addedMembers.find((member) => member._id === userId);
      if (removedUser) {
        setAddedMembers((prev) => prev.filter((member) => member._id !== userId));
        setAllUsers((prev) => [...prev, removedUser]);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const members = [
        { memberId: userId, role: "OWNER" },
        ...addedMembers.map((member) => ({
          memberId: member._id,
          role: member.role,
        })),
      ];
  
      try {
        await createBoardWithMembers({ boardTitle, boardDescription, members });
        showNotification("Board created successfully!");
        formRef.current.reset();
        navigate("/whiteboards");
      } catch (error) {
        console.error(`Error creating board: ${error}`);
        showNotification("Error creating board", "error");
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {loading && <LinearProgress className="absolute top-0 left-0 right-0" />}

      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <Box className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              variant="outlined"
              className="hover:bg-white/50"
            >
              Back
            </Button>
            <Typography
              variant="h4"
              className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Create New Board
            </Typography>
            <div className="w-24" />
          </div>
          <Paper elevation={0} className="p-4 bg-white/50 backdrop-blur-sm">
            <Typography
              variant="body1"
              color="textSecondary"
              className="text-center"
            >
              Create a new board and invite team members to collaborate
            </Typography>
          </Paper>
        </Box>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Board Details Form */}
          <div className="space-y-6">
            <Paper elevation={3} className="p-8 bg-white/90 backdrop-blur-sm">
              <Typography variant="h6" className="mb-6 flex items-center gap-2">
                <EditIcon className="text-blue-500" />
                Board Details
              </Typography>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <TextField
                  label="Board Title"
                  variant="outlined"
                  fullWidth
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  className="bg-white"
                  required
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={boardDescription}
                  onChange={(e) => setBoardDescription(e.target.value)}
                  className="bg-white"
                  required
                />
                <Box className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outlined"
                    onClick={canBtnHandler}
                    className="hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!boardTitle || !boardDescription}
                  >
                    Create Board
                  </Button>
                </Box>
              </form>
            </Paper>
          </div>

          {/* Enhanced Members Section */}
          <div className="space-y-6">
            {/* Available Users with Search */}
            <Paper elevation={3} className="p-8 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h6" className="flex items-center gap-2">
                  <GroupAdd className="text-blue-500" />
                  Available Users
                </Typography>
                <Chip
                  label={`${filteredUsers.length} available`}
                  size="small"
                  className="bg-blue-100 text-blue-700"
                />
              </div>

              <div className="mb-4 flex gap-4">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon className="text-gray-400 mr-2" />
                    ),
                  }}
                  className="bg-white"
                />
                <Tooltip title="Filter options">
                  <IconButton size="small" className="border">
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <div className="max-h-[300px] overflow-y-auto rounded-lg border border-gray-100">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-blue-500">
                        {user?.firstName?.[0]}
                      </Avatar>
                      <div>
                        <Typography variant="subtitle1" className="font-medium">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.email}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FormControl size="small" className="min-w-[120px]">
                        <InputLabel>Role</InputLabel>
                        <Select
                          label="Role"
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="bg-white"
                        >
                          <MenuItem value="EDITOR">Editor</MenuItem>
                          <MenuItem value="VIEWER">Viewer</MenuItem>
                        </Select>
                      </FormControl>
                      <Tooltip title="Add member">
                        <IconButton
                          color="primary"
                          onClick={handleAddMember}
                          size="small"
                          className="hover:bg-blue-50"
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="p-8 text-center">
                    <Typography color="textSecondary">
                      No users found
                    </Typography>
                  </div>
                )}
              </div>
            </Paper>

            {/* Added Members List */}
            <Paper elevation={3} className="p-8 bg-white/90 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h6" className="flex items-center gap-2">
                  <PersonIcon className="text-blue-500" />
                  Added Members
                </Typography>
                <Chip
                  label={`${addedMembers.length} member${
                    addedMembers.length !== 1 ? "s" : ""
                  }`}
                  color="primary"
                  size="small"
                  className="bg-blue-100 text-blue-700"
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto rounded-lg border border-gray-100">
                {addedMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-blue-500">
                        {member.firstName[0]}
                      </Avatar>
                      <div>
                        <Typography variant="subtitle1" className="font-medium">
                          {member.firstName} {member.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {member.email}
                        </Typography>
                        <Chip
                          label={member.role}
                          size="small"
                          className="mt-1 bg-blue-50 text-blue-700"
                        />
                      </div>
                    </div>
                    <Tooltip title="Remove member">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveMember(member._id)}
                        size="small"
                        className="hover:bg-red-50"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ))}
                {addedMembers.length === 0 && (
                  <div className="p-8 text-center">
                    <Typography color="textSecondary">
                      No members added yet
                    </Typography>
                  </div>
                )}
              </div>
            </Paper>
          </div>
        </div>
      </div>

      <Snackbar
        open={notification.show}
        autoHideDuration={5000}
        onClose={() => setNotification({ ...notification, show: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={notification.type}
          variant="filled"
          onClose={() => setNotification({ ...notification, show: false })}
          className="backdrop-blur-sm"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateNewBoard;
