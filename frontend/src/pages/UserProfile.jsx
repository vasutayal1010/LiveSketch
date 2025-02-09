import React, { useState } from "react";
import { 
  User, 
  Edit, 
  Lock,
  LogOut, 
  Clock,
  Settings,
  ChevronRight,
  Eye,
  EyeOff
} from "lucide-react";

const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    avatar: "/api/placeholder/150/150"
  });

  const [loginHistory] = useState([
    { date: "2025-02-08", time: "09:30 AM", device: "Chrome / MacOS" },
    { date: "2025-02-07", time: "02:15 PM", device: "Safari / iOS" },
    { date: "2025-02-06", time: "11:45 AM", device: "Firefox / Windows" },
  ]);
  const [boardHistory] = useState([
    { date: "2025-02-08", CreatedBy: "sumit", boardId: "123" },
    { date: "2025-02-07", CreatedBy: "uncle", boardId: "333" },
    { date: "2025-02-06", CreatedBy: "vasu", boardId: "343" },
  ]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Profile updated");
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    console.log("Password reset");
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const menuItems = [
    { id: "profile", label: "Profile Details", icon: User },
    { id: "update", label: "Update Profile", icon: Edit },
    { id: "reset", label: "Reset Password", icon: Lock },
    { id: "loginHistory", label: "Login History", icon: Clock },
    { id: "boardHistory", label: "Board History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />
            <div>
              <h2 className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight className="ml-auto" size={16} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-8 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
{activeSection === "profile" && (
  <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <h2 className="text-4xl font-bold">Profile Details</h2>
        <p className="text-lg mt-2 opacity-90">View and manage your personal information</p>
      </div>

      {/* Profile Content */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-6">
            {/* Name Section */}
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-lg text-gray-600">{user.email}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="bg-gray-50 p-6 rounded-xl transition-all duration-200">
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className="mt-2 text-xl font-semibold text-gray-800">{user.firstName}</p>
              </div>

              {/* Last Name */}
              <div className="bg-gray-50 p-6 rounded-xl  transition-all duration-200">
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <p className="mt-2 text-xl font-semibold text-gray-800">{user.lastName}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-6 rounded-xl  transition-all duration-200">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-2 text-xl font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
          {activeSection === "update" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Update Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      defaultValue={user.firstName}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      defaultValue={user.lastName}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {activeSection === "reset" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Reset Password</h2>
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Reset Password
                </button>
              </form>
            </div>
          )}

          {activeSection === "loginHistory" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Login History</h2>
              <div className="space-y-4">
                {loginHistory.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium text-gray-800">{log.date}</p>
                        <p className="text-sm text-gray-500">{log.time}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{log.device}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "boardHistory" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Board History</h2>
              <div className="space-y-4">
                {boardHistory.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium text-gray-800">{log.date}</p>
                        <p className="text-sm text-gray-500">Creator: {log.CreatedBy}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Board id: {log.boardId}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email about account activity</p>
                  </div>
                  <button className="w-11 h-6 bg-blue-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-4 border-t">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button className="w-11 h-6 bg-gray-200 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;