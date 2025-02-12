import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewBoard = ({ canBtnHandler }) => {
    const userId = localStorage.getItem('userId');
    const formRef = useRef(null);
    const navigate = useNavigate();
  
    const [allUsers, setAllUsers] = useState([]);
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [addedMembers, setAddedMembers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchAllUsersForSystem(userId);
        setAllUsers(responseData.users);
      } catch (error) {
        console.error(`Error loading boards: ${error}`);
        showNotification('Error loading users', 'error');
      }
    };
    fetchDataAsync();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
  };

  const handleRoleChange = (userId, role) => {
    const user = allUsers.find(user => user._id === userId);
    setSelectedUser({ ...user, role });
  };

  const handleAddMember = () => {
    if (selectedUser) {
      setAddedMembers(prev => [...prev, selectedUser]);
      setAllUsers(prev => prev.filter(user => user._id !== selectedUser._id));
      setSelectedUser(null);
    }
  };

  const handleRemoveMember = (userId) => {
    const removedUser = addedMembers.find(member => member._id === userId);
    if (removedUser) {
      setAddedMembers(prev => prev.filter(member => member._id !== userId));
      setAllUsers(prev => [...prev, removedUser]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const members = [
      { memberId: userId, role: 'OWNER' },
      ...addedMembers.map(member => ({ memberId: member._id, role: member.role }))
    ];

    try {
      await createBoardWithMembers({ boardTitle, boardDescription, members });
      showNotification('Board created successfully!');
      formRef.current.reset();
      navigate('/whiteboards');
    } catch (error) {
      console.error(`Error creating board: ${error}`);
      showNotification('Error creating board', 'error');
    }
  };

  const UserCard = ({ user, onAction, actionType, role, onRoleChange }) => (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
            {user.firstName?.[0] || '?'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {role && <p className="text-sm font-medium text-indigo-600">Role: {role}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {actionType === 'add' && (
            <>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm transition-all"
                value={selectedUser?._id === user._id ? selectedUser.role : ''}
                onChange={(e) => onRoleChange(user._id, e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Viewer</option>
              </select>
              <button
                onClick={onAction}
                disabled={!selectedUser || selectedUser._id !== user._id}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </>
          )}
          {actionType === 'remove' && (
            <button
              onClick={onAction}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const SectionTitle = ({ title }) => (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg blur"></div>
      <div className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/50 to-transparent"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-purple-300/20 to-pink-300/20 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Title Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
          <div className="relative bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md rounded-xl p-6 border border-indigo-200 shadow-lg">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Create New Board
            </h1>
            <div className="mt-2 text-gray-600">
              Create and customize your board, add team members, and set their permissions
            </div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/50 to-transparent"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Board Details Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
              <SectionTitle title="Board Details" />
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Board Title</label>
                  <input
                    type="text"
                    placeholder="Enter board title"
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    placeholder="Enter board description"
                    value={boardDescription}
                    onChange={(e) => setBoardDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 backdrop-blur-sm transition-all"
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={canBtnHandler}
                    className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Create Board
                  </button>
                </div>
              </form>
            </div>

            {/* Added Members */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
              <SectionTitle title="Added Members" />
              <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100 relative">
                {addedMembers.map(member => (
                  <UserCard 
                    key={member._id}
                    user={member}
                    role={member.role}
                    onAction={() => handleRemoveMember(member._id)}
                    actionType="remove"
                  />
                ))}
                {addedMembers.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No members added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Available Users */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
            <SectionTitle title="Available Users" />
            <div className="overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100 relative">
              {allUsers.map(user => (
                <UserCard 
                  key={user._id}
                  user={user}
                  onAction={handleAddMember}
                  onRoleChange={handleRoleChange}
                  actionType="add"
                />
              ))}
              {allUsers.length === 0 && (
                <p className="text-gray-500 text-center py-8">No available users</p>
              )}
            </div>
          </div>
        </div>

        {/* Notification remains the same */}
        {notification.show && (
          <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg ${
            notification.type === 'error' 
              ? 'bg-gradient-to-r from-red-500 to-pink-500' 
              : 'bg-gradient-to-r from-green-500 to-emerald-500'
          } text-white backdrop-blur-sm transition-all duration-300`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNewBoard;