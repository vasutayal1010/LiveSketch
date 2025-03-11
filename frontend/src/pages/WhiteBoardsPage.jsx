import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Input,
  Alert,
  AlertTitle,
} from "@mui/material";
import { AlertCircle, Users, Clock, Search, Plus, Filter } from "lucide-react";
import { fetchBoardsForUser, deleteBoardById } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";

const WhiteBoardsPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const openHandleClick = (boardId) => {
    localStorage.setItem("boardId", boardId);
    navigate(`../whiteboard/${boardId}`);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoardById(boardId);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board._id !== boardId)
      );
    } catch (error) {
      console.log(`Error while deleting board: ${error}`);
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("User ID not found.");
      setLoading(false);
      return;
    }

    const loadBoards = async () => {
      try {
        const response = await fetchBoardsForUser(userId);
        const data = response?.respBoard || [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array of boards");
        }

        setBoards(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
        setError(error.message || "Failed to fetch boards");
        setBoards([]);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getFilteredBoards = () => {
    return boards.filter((board) => {
      if (!board) return false;

      const matchesSearch =
        (board.boardTitle?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (board.boardDescription?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        );
      const matchesRole = selectedRole === "all" || board.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  };

  if (error) {
    return (
      <div>
        <div className="w-full">
          <AppHeader />
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <Alert severity="error" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">
              Something went wrong
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't load your whiteboards
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
              color="primary"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="w-full">
          <AppHeader />
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const filteredBoards = getFilteredBoards();

  return (
    <div>
      <div className="w-full">
        <AppHeader />
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">My Whiteboards</h1>
            <p className="text-gray-500 mt-2">
              Manage and access your collaborative spaces
            </p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-board")}
          >
            <Plus className="h-4 w-4" />
            New Board
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search boards..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-md border border-gray-200 bg-white"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="OWNER">Owner</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
            <Button variant="outlined">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoards.map((board, index) => (
            <Card
              key={board._id || `board-${index}`}
              className="group hover:shadow-xl transition-all"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {board.boardTitle || "Untitled Board"}
                    </h2>
                    <Badge color="secondary">{board.role || "No Role"}</Badge>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {board.boardDescription || "No description available"}
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">
                      Members: {board.members?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">Last updated:</span>
                    {formatDate(board.updatedAt)}
                  </div>
                </div>

                {/* Buttons: Open Board & Delete */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => openHandleClick(board._id)}
                    variant="outlined"
                    fullWidth
                  >
                    Open Board
                  </Button>

                  <Button
                    onClick={() => handleDeleteBoard(board._id)}
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhiteBoardsPage;
