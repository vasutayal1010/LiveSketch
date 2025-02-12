import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { registerUser } from "../services/apiService";
import { useNavigate, Link } from 'react-router-dom';

const TypewriterText = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const Register = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  useEffect(() => {
    // Start animations after component mount
    setStartAnimation(true);
  }, []);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    <div className="min-h-screen flex">
      {/* Left Side - Animated Content */}
      <div className="hidden lg:flex lg:w-9/10 relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(40deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.07)_100%)] animate-gradient"></div>
          <div className="absolute top-0 left-0 w-full h-full animate-pulse opacity-30">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full filter blur-xl"></div>
            <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full filter blur-xl"></div>
          </div>
        </div>
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed w-full z-50">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Realtime Whiteboard</span>
            </Link>
            <div className="space-x-6">
              <Link to="/" className="text-white hover:text-purple-200 transition duration-300">
                Home
              </Link>
              <Link to="/login"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white rounded-xl hover:bg-white group">
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-900 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-purple-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </header>
        <div className="relative w-full flex flex-col justify-center px-12 space-y-8">
          <div className={`transform transition-all duration-1000 ${startAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {startAnimation && <TypewriterText text="Welcome to Our Platform" />}
            </h1>
            <p className="text-blue-100 text-lg opacity-0 animate-fadeIn delay-1000">
              {startAnimation && <TypewriterText text="Start your journey with us today and discover endless possibilities." delay={30} />}
            </p>
          </div>

          <div className="space-y-6">
            {/* Feature items with staggered animations */}
            {startAnimation && ['Create your personalized profile', 'Secure and encrypted data protection', 'Stay updated with email notifications'].map((text, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${(index + 2) * 300} ${startAnimation ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
              >
                <div className="flex items-center space-x-4 text-white/90 hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    {index === 0 ? <User className="w-6 h-6" /> :
                      index === 1 ? <Lock className="w-6 h-6" /> :
                        <Mail className="w-6 h-6" />}
                  </div>
                  <p className="relative overflow-hidden">
                    <TypewriterText text={text} delay={40} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-float"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-4 animate-fadeIn">
          <div className="text-center animate-bounceIn">
            <div className="inline-flex p-3 rounded-full bg-blue-600/20 mb-2">
              <UserPlus className="mx-auto text-blue-700 w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
            <p className="text-sm text-gray-700">Join us today and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="space-y-3">
              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-3  animate-slideUp delay-100">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.firstName
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-blue-300"
                        }`}
                    />
                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
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
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.lastName
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-blue-300"
                        }`}
                    />
                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Username Input */}
              <div className="relative animate-slideUp delay-200">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.username
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                    }`}
                />
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative animate-slideUp delay-300">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                    }`}
                />
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Inputs */}
              <div className="relative animate-slideUp delay-400">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.password
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                    }`}
                />
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.password ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative animate-slideUp delay-500">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${errors.confirmPassword
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                    }`}
                />
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-slideUp delay-600">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] animate-pulse"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center pt-2 animate-fadeIn delay-700">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:scale-105 transform"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

/* Add these styles to your CSS/Tailwind config */
