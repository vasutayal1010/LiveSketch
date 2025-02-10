import React, { useState, useEffect } from "react";
import {
  User,
  Edit,
  Lock,
  LogOut,
  Clock,
  Settings,
  ChevronRight,
  Eye,
  EyeOff,
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-gray-800">
                {updatedUser.firstName} {updatedUser.lastName}
              </h2>
              {/* <p className="text-sm text-gray-500">{user.email}</p> */}
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
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
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
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Profile Details</h2>
              <div className="space-y-4">
                {/* Profile Picture and Basic Details */}
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="ml-6">
                    <h3 className="text-xl font-medium">
                      {user.firstName || "Login Please"} {user.lastName}
                    </h3>
                    <p className="text-gray-500">@{user.username}</p>
                  </div>
                </div>

                {/* Additional Profile Information */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      First Name
                    </label>
                    <p className="mt-1 text-gray-900">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Last Name
                    </label>
                    <p className="mt-1 text-gray-900">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Username
                    </label>
                    <p className="mt-1 text-gray-900">{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Role
                    </label>
                    <p className="mt-1 text-gray-900 capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Account Created At
                    </label>
                    <p className="mt-1 text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "update" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name='firstName'
                      onChange={handleChange_update}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name='lastName'
                      onChange={handleChange_update}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name='username'
                    onChange={handleChange_update}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {activeSection === "reset" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {/* Current Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword.current ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword.new ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword.confirm ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Password
                </button>
              </form>
            </div>
          )}

          {activeSection === "history" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Login History</h2>
              <div className="space-y-4">
                {loginHistory.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="text-gray-400" size={20} />
                      <div>
                        <p className="font-medium">{log.date}</p>
                        <p className="text-sm text-gray-500">{log.time}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{log.device}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {activeSection === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive email about account activity
                    </p>
                  </div>
                  <button className="w-11 h-6 bg-blue-600 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-t">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="w-11 h-6 bg-gray-200 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;