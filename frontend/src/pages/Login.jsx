import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/apiService";

const TypewriterText = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((c) => c + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const Login = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Start animations after component mount
    setStartAnimation(true);
  }, []);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const responseData = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);
        localStorage.setItem("username", responseData.username);
        localStorage.setItem("fullname", responseData.fullname);
        navigate("/whiteboards");
      } catch (error) {
        setErrors({
          general: "Invalid email or password. Please try again.",
        });
        console.log(`error while logging in: ${error}`);
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
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center space-x-2"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Realtime Whiteboard</span>
            </Link>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-white hover:text-purple-200 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-white rounded-xl hover:bg-white group"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-900 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-purple-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Register
                </span>
              </Link>
            </div>
          </div>
        </header>
        <div className="relative w-full flex flex-col justify-center px-12 space-y-8">
          <div
            className={`transform transition-all duration-1000 ${
              startAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {startAnimation && <TypewriterText text="Welcome Back, Login to Continue" />}
            </h1>
            <p className="text-blue-100 text-lg opacity-0 animate-fadeIn delay-1000">
              {startAnimation && (
                <TypewriterText
                  text="Sign in to continue your creative journey with us."
                  delay={30}
                />
              )}
            </p>
          </div>

          <div className="space-y-6">
            {/* Feature items with staggered animations */}
            {startAnimation &&
              [
                "Collaborate in real-time",
                "Access all your saved whiteboards",
                "Join team sessions securely",
              ].map((text, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 delay-${
                    (index + 2) * 300
                  } ${
                    startAnimation
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                >
                  <div className="flex items-center space-x-4 text-white/90 hover:scale-105 transition-transform duration-300">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      {index === 0 ? (
                        <User className="w-6 h-6" />
                      ) : index === 1 ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <Mail className="w-6 h-6" />
                      )}
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-4 animate-fadeIn">
          <div className="text-center animate-bounceIn">
            <div className="inline-flex p-3 rounded-full bg-blue-600/20 mb-2">
              <User
                className="mx-auto text-blue-700 w-8 h-8"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
            <p className="text-sm text-gray-700">
              Access your whiteboard and continue creating
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {errors.general && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm animate-shake">
                {errors.general}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative animate-slideUp delay-100">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                <Mail
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative animate-slideUp delay-200">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-8 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
                    errors.password
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                <Lock
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between animate-slideUp delay-300">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-slideUp delay-400 pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] animate-pulse"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center pt-4 animate-fadeIn delay-500">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:scale-105 transform"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Social Login Options */}
          <div className="mt-6 animate-fadeIn delay-600">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </button>
              </div>
              <div>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
              </div>
              <div>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
