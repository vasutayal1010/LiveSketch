import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from '../services/apiService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const responseData = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('username', responseData.username);
      localStorage.setItem('fullname', responseData.fullname);
      navigate('/whiteboards');
    } catch (error) {
      console.log(`error while logging in user : ${error}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}

      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite] -top-40 -left-20"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] top-1/2 -right-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite] -bottom-20 left-1/2 transform -translate-x-1/2"></div>
      </div>
        {/*navbar*/}

      <header className="fixed w-full z-50">
        <div className="backdrop-blur-md bg-white/10 border-b border-white/10 shadow-lg">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-3 group">
              <svg className="w-8 h-8 transform group-hover:rotate-12 transition-transform duration-300" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Realtime Whiteboard
              </span>
            </Link>
            <div className="space-x-6">
              <Link to="/" 
                    className="text-white/90 hover:text-white transition duration-300">
                Home
              </Link>
              <Link to="/register" 
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white rounded-xl hover:bg-white group">
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-purple-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Content container */}
      <div className="relative min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-purple-500/10">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-lg">
                Please enter your details to sign in
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.email ? "border-red-500" : "border-gray-300 hover:border-purple-300"}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm
                      ${errors.password ? "border-red-500" : "border-gray-300 hover:border-purple-300"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-1">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="/forget-password"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-5 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  Sign in
                </button>

                {/* Sign Up Button */}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-3 px-5 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md backdrop-blur-sm"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;