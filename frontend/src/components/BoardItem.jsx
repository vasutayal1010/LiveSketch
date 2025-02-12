import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBoardById } from '../services/apiService';

const BoardItem = ({ boardId, name, description, role, memberCnt, lastAccessedAt }) => {
    const navigate = useNavigate();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
    const [openOpenBoardConfirmDialog, setOpenOpenBoardConfirmDialog] = useState(false);

    const handleEditClick = () => {
        setOpenEditDialog(true); 
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleOpenBoard = () => {
        console.log(`handleOpenBoard called... for ${boardId}`)
        setOpenOpenBoardConfirmDialog(true);
    };

    const handleOpenBoardConfirm = () => {
        console.log(`handleOpenBoardConfirm called...`);
        localStorage.setItem('boardId', boardId)
        navigate(`../whiteboard/${boardId}`)
    }

    const handleDeleteBoard = () => {
        console.log(`handleDeleteBoard called...`);
        setOpenDeleteConfirmDialog(true);
    };
    
    const handleDeleteClose = () => {
        console.log(`handleDeleteClose called...`);
        setOpenDeleteConfirmDialog(false);
    };

    const handleDeleteBoardConfirm = async () => {
        console.log(`handleDeleteBoardConfirm called...`);

        try {
            const responseData = await deleteBoardById(boardId); 
            console.log(responseData);

            window.location.reload();
            setOpenDeleteConfirmDialog(false)
        } catch (error) {
            console.log(`error while deleting board : ${error}`);
        }
    }

    const handleCloseOpenBoardDialog = () => {
        console.log(`handleCloseOpenBoardDialog called...`);
        setOpenOpenBoardConfirmDialog(false);
    };

    const ActionButton = ({ icon, label, onClick, variant = "default" }) => {
        const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm";
        const variants = {
          default: "bg-white/80 hover:bg-white border border-indigo-100 text-indigo-600 hover:shadow-md",
          danger: "bg-white/80 hover:bg-red-50 border border-red-100 text-red-600 hover:shadow-md",
          primary: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:shadow-md"
        };


        return (
            <div className="w-full">
              <div className="relative group">
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300"></div>
                
                {/* Card content */}
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 group-hover:shadow-xl overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        
                  <div className="space-y-6">
                    {/* Header section */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                          {name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {(role === 'EDITOR' || role === 'OWNER') && (
                          <ActionButton
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                            label="Delete"
                            onClick={handleDeleteBoard}
                            variant="danger"
                          />
                        )}
                        <ActionButton
                          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                          label="Open"
                          onClick={handleOpenBoard}
                          variant="primary"
                        />
                        {(role === 'EDITOR' || role === 'OWNER') && (
                          <ActionButton
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                            label="Edit"
                            onClick={handleEditClick}
                          />
                        )}
                      </div>
                    </div>
        
                    {/* Footer section with metadata */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="text-sm font-medium text-indigo-600">
                          {role}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Members</p>
                        <p className="text-sm font-medium text-indigo-600">
                          {memberCnt}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Last accessed</p>
                        <p className="text-sm font-medium text-indigo-600">
                          {lastAccessedAt === null ? 'Never' : new Date(lastAccessedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Modals/Dialogs */}
              <EditBoardDialog open={openEditDialog} handleClose={handleCloseEditDialog} />
              <ConfirmModal
                open={openDeleteConfirmDialog}
                title="Delete Confirmation"
                content="Are you sure you want to delete this board? This action cannot be undone."
                onConfirm={handleDeleteBoardConfirm}
                onClose={handleDeleteClose}
              />
              <ConfirmModal
                open={openOpenBoardConfirmDialog}
                title="Open Board"
                content="Do you want to open this board? Any unsaved changes in your current board will be lost."
                onConfirm={handleOpenBoardConfirm}
                onClose={handleCloseOpenBoardDialog}
              />
            </div>
          );
        };
}
    export default BoardItem;