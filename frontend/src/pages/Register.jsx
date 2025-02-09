
import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { registerUser } from "../services/apiService";
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required!`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include a number, letter & special character!";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
       try {
         const responseData = await registerUser(formData);
         navigate('/login');
       } catch (error) {
         console.log(`error while registering user : ${error}`);
       }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-end py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('src/resources/images/Project_16-14.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Glass Effect Container - Darker and more defined */}
      <div className="relative w-full max-w-md space-y-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 mr-8 mt-4 border border-white/20">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-blue-600/20 mb-2">
            <UserPlus
              className="mx-auto text-blue-700 w-8 h-8"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-700">
            Join us today and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="space-y-3">
            {/* Name Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                  <User
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }`}
                  />
                  <User
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <User
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <Mail
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Inputs */}
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <Lock
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.password ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white/90 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <Lock
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => console.log("Navigate to login")}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

