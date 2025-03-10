import React, { useEffect, useState } from "react";
import { Plus, Loader2, Grid as GridIcon } from "lucide-react";
import CreateNewBoard from "../components/CreateNewBoard";
import AppHeader from "../components/AppHeader.jsx"

const WhiteBoardsPage = () => {
  const userId = localStorage.getItem("userId");
  const [isCreateNewBoardPage, setIsCreateNewBoardPage] = useState(false);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchBoardsForUser(userId);
        setBoards(responseData.respBoard);
        setIsLoading(false);
      } catch (error) {
        console.log(`error while loading boards for user: ${error}`);
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  function handleToggleNewBoard() {
    setIsCreateNewBoardPage(!isCreateNewBoardPage);
  }

  // Background decoration component
  const BackgroundDecoration = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 60s linear infinite',
            '@keyframes gridMove': {
              '0%': { transform: 'translateY(0)' },
              '100%': { transform: 'translateY(40px)' }
            }
          }}
        />
        
        {/* Floating orbs with gradients */}
        <div className="absolute top-20 left-[10%] w-72 h-72 animate-float-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full 
                        filter blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        
        <div className="absolute bottom-40 right-[15%] w-96 h-96 animate-float-slower">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full 
                        filter blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/3 animate-spin-slow">
          <div className="w-32 h-32 border-4 border-indigo-100/30 rounded-lg transform rotate-12 
                        backdrop-blur-sm animate-pulse-slow" />
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 animate-spin-slower">
          <div className="w-40 h-40 border-4 border-purple-100/30 rounded-lg transform -rotate-12 
                        backdrop-blur-sm animate-pulse-slow" />
        </div>
        
        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Light beam effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent 
                      transform rotate-12 blur-3xl animate-beam" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-transparent 
                      transform -rotate-12 blur-3xl animate-beam-slow" />
        
        {/* Highlights */}
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-white/5 to-transparent 
                      transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <AppHeader/>
        <BackgroundDecoration />
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isCreateNewBoardPage) {
    return (
      <div className="min-h-screen relative">
        <BackgroundDecoration />
        <div className="relative min-h-screen flex flex-col">
          <div className="container mx-auto px-4 py-1">
            <button
              onClick={handleToggleNewBoard}
              className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Boards
            </button>
          </div>
          <div className="flex-grow container mx-auto px-4 pb-8">
              <CreateNewBoard />
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundDecoration />
      <AppHeader/>
      <div className="relative container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <GridIcon className="mr-2 h-8 w-8 text-indigo-600" />
            My Whiteboards
          </h1>
          <p className="text-gray-600">Create and manage your collaborative whiteboards</p>
        </header>

        <button
          onClick={handleToggleNewBoard}
          className="mb-8 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                   text-white rounded-lg shadow-lg transition-all duration-200 transform 
                   hover:scale-105 active:scale-95 hover:shadow-indigo-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Board
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 
                       hover:shadow-xl transition-all duration-200 transform 
                       hover:-translate-y-1 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {board.title}
              </h3>
              <p className="text-gray-600 mb-4">{board.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Created {new Date(board.createdAt).toLocaleDateString()}
                </span>
                <button
                  className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg
                           hover:bg-indigo-200 transition-colors duration-200"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhiteBoardsPage;