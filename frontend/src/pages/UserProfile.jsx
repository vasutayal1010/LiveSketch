import React, { useState, useEffect } from "react";
import {
  User,
  Edit,
  Lock,
  LogOut,
  Clock,
  ChevronRight,
  Eye,
  EyeOff,
  Camera,
  Shield,
  AlertCircle
} from "lucide-react";
import { resetPassword, getUserInfoByUserId, updateUserDetails } from "../services/apiService";
import { useNavigate } from "react-router-dom";
const ProfileDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [updatedUser, setUpdatedUser] = useState({});

  const handleChange_update = (e) => {
     setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await getUserInfoByUserId(userId);
        console.log(responseData.data);
        const data = {
          ...responseData.user,
          avatar: "src/resources/images/profile_1.jpg",
        };
        setUser(data);
        setUpdatedUser({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
        });
      } catch (error) {
        console.log(`error while loading boads for user : ${error}`);
      }
    };

    fetchDataAsync();
  }, [userId]);


  const [loginHistory] = useState([
    { date: "2025-02-08", time: "09:30 AM", device: "Chrome / MacOS" },
    { date: "2025-02-07", time: "02:15 PM", device: "Safari / iOS" },
    { date: "2025-02-06", time: "11:45 AM", device: "Firefox / Windows" },
  ]);

  const handleUpdate = async (e) => {
    e.preventDefault();
     try {
      const response = await updateUserDetails(userId, updatedUser);
      console.log(response);
        setUser((prev) => ({ ...prev, ...updatedUser }));
        localStorage.setItem("username", updatedUser.username);
        localStorage.setItem("fullname", `${updatedUser.firstName} ${updatedUser.lastName}`);
        console.log('User Details Update Successfully')
      
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Reset Password
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await resetPassword(userId, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      console.log("Password reset response:", response);

      alert("Password reset successful!");
    } catch (error) {
      console.error("Error occurred while resetting password:", error);
      alert("Failed to reset password!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logout Successful");
    navigate("/login");
  };

  const menuItems = [
    { id: "profile", label: "Profile Details", icon: User },
    { id: "update", label: "Update Profile", icon: Edit },
    { id: "reset", label: "Reset Password", icon: Lock },
    { id: "history", label: "Login History", icon: Clock },
  ];

    return (
      <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500">
      {/* Enhanced Sidebar */}
      <div className="w-72 fixed h-screen bg-white/80 backdrop-blur-xl shadow-2xl border-r border-gray-100/50 transition-all duration-500 hover:shadow-blue-200/20">
        <div className="p-8 border-b border-gray-100/50">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
              <img
                src={user.avatar}
                alt="Profile"
                className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-24 h-24 rounded-full bg-black/40 absolute flex items-center justify-center backdrop-blur-sm">
                  <Camera className="text-white w-6 h-6 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-gray-800 text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {updatedUser.firstName} {updatedUser.lastName}
              </h2>
              <p className="text-sm text-blue-600 font-medium mt-1">@{user.username}</p>
            </div>
          </div>
        </div>

        <nav className="p-6">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-500 group 
                      ${activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    <Icon 
                      size={20} 
                      className={`transition-all duration-500 ${
                        activeSection === item.id ? "animate-pulse" : "group-hover:scale-110"
                      }`} 
                    />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight 
                      className={`ml-auto transition-all duration-500 ${
                        activeSection === item.id ? "rotate-90 animate-pulse" : "group-hover:translate-x-1"
                      }`} 
                      size={18} 
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-gray-100/50 pt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-6 py-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-500 group"
            >
              <LogOut size={20} className="transition-transform duration-500 group-hover:-translate-x-1" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Enhanced Main Content */}
      <div className="ml-72 p-8">
        <div className="max-w-4xl mx-auto">
          {activeSection === "profile" && (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Profile Details
                </h2>
                <div className="space-y-8">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-50 blur transition duration-500"></div>
                    <div className="relative flex items-center space-x-8 bg-white p-8 rounded-xl">
                      <div className="relative group/img">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover/img:opacity-100 blur transition duration-500"></div>
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="relative w-32 h-32 rounded-full object-cover ring-4 ring-white transition-all duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <div className="w-32 h-32 rounded-full bg-black/40 absolute flex items-center justify-center backdrop-blur-sm">
                            <Camera className="text-white w-8 h-8 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {user.firstName || "Login Please"} {user.lastName}
                        </h3>
                        <p className="text-blue-600 font-medium mt-1">@{user.username}</p>
                        <div className="flex items-center mt-3 text-gray-600">
                          <Shield className="w-4 h-4 mr-2" />
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "First Name", value: user.firstName },
                      { label: "Last Name", value: user.lastName },
                      { label: "Username", value: user.username },
                      { label: "Email", value: user.email },
                      { label: "Role", value: user.role },
                      { 
                        label: "Account Created", 
                        value: new Date(user.createdAt).toLocaleDateString()
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-500"></div>
                        <div className="relative p-6 rounded-xl bg-white transition-all duration-500 group-hover:scale-[1.02]">
                          <label className="text-sm font-medium text-gray-500">
                            {item.label}
                          </label>
                          <p className="mt-2 text-gray-900 font-medium capitalize">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
  
            {activeSection === "update" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Update Profile
                </h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "First Name", name: "firstName", type: "text" },
                      { label: "Last Name", name: "lastName", type: "text" }
                    ].map((field) => (
                      <div key={field.name} className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          onChange={handleChange_update}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 group-hover:bg-white"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange_update}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 group-hover:bg-white"
                      placeholder="Username"
                    />
                  </div>
  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}
  
            {activeSection === "reset" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Reset Password
                </h2>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-600">
                    Make sure your new password is at least 8 characters long and includes a mix of letters, numbers, and symbols.
                  </p>
                </div>
  
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  {[
                    { 
                      label: "Current Password",
                      name: "currentPassword",
                      show: showPassword.current,
                      toggle: () => setShowPassword(prev => ({ ...prev, current: !prev.current }))
                    },
                    {
                      label: "New Password",
                      name: "newPassword",
                      show: showPassword.new,
                      toggle: () => setShowPassword(prev => ({ ...prev, new: !prev.new }))
                    },
                    {
                      label: "Confirm New Password",
                      name: "confirmPassword",
                      show: showPassword.confirm,
                      toggle: () => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))
                    }
                  ].map((field) => (
                    <div key={field.name} className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.show ? "text" : "password"}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 group-hover:bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={field.toggle}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {field.show ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            )}
  
            {activeSection === "history" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Login History
                </h2>
                <div className="space-y-4">
                  {loginHistory.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Clock className="text-blue-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{log.date}</p>
                          <p className="text-sm text-gray-500">{log.time}</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {log.device}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default ProfileDashboard;