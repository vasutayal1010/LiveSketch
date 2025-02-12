import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = ({ isProfilePage }) => {
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutConfirm, setLogoutConfirm] = useState(false);

  const menuOptions = [
    {
      title: "Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      path: "/user-profile",
    },
    {
      title: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      action: () => setLogoutConfirm(true),
    },
  ];

  return (
    <>
      <header className="bg-blue-600 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16">
            {/* Left side - Logo/Title */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-xl font-bold">
                Collaborative WhiteBoard
              </h1>
            </div>

            {/* Right side - User Menu */}
            {!isProfilePage && (
              <div className="flex-1 flex justify-end items-center gap-4">
                <span className="text-white font-medium hidden sm:block">
                  {fullname}
                </span>
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-colors duration-200"
                  >
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                      {menuOptions.map((option, index) => (
                        <div key={index}>
                          {option.path ? (
                            <Link
                              to={option.path}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {option.icon}
                              <span>{option.title}</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                option.action();
                                setIsMenuOpen(false);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              {option.icon}
                              <span>{option.title}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {isLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Logout Confirmation</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
