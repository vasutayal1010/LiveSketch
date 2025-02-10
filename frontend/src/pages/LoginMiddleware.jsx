import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const LoginMiddleware = ({ children }) => {
  const [countdown, setCountdown] = useState(5);
  const isAuthenticated = false; // Replace with your auth logic
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      window.location.href = "/login";
    }
  }, [countdown, isAuthenticated]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex justify-center">
                <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="mt-4 text-center text-white text-2xl font-bold">
                Access Restricted
              </h2>
              <p className="mt-2 text-center text-white/80">
                Authentication is required to view this page
              </p>
            </div>

            {/* Content Section */}
            <div className="px-8 py-6">
              {/* Alert Message */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r mb-6">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-amber-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-amber-800">
                    You will be redirected to Sign In Page in {countdown} seconds
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg
                           hover:from-blue-700 hover:to-indigo-700 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                           transition-all duration-200 transform hover:scale-[1.02]
                           font-semibold shadow-md"
                >
                  Sign In Now
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gray-50 text-gray-700 px-6 py-3 rounded-lg
                           hover:bg-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
                           transition-all duration-200
                           font-medium"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-4 text-center text-gray-600 text-sm">
            Need help? Contact{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              support
            </a>
          </p>
        </div>
      </div>
    );
  
  return children;
};

export default LoginMiddleware;
