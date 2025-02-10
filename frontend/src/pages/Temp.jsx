import React from "react";


const LoginMiddleware = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
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

        {/* Alert Message */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Authentication Required
              </h3>
              <p className="mt-2 text-sm text-red-700">
                Please log in to access this page. You will be redirected to the
                login page.
              </p>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                         transition-colors duration-200 text-sm font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginMiddleware;
