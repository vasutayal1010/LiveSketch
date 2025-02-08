// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="text-white text-2xl font-bold">
            Realtime Whiteboard
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://source.unsplash.com/1600x900/?collaboration,whiteboard)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay to darken the background for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Collaborate in Real Time
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Join teams, brainstorm ideas, and share your creativity on a
            dynamic, interactive whiteboard.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="border border-white hover:border-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white shadow-xl rounded-lg p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?drawing"
                alt="Real-Time Drawing"
                className="w-full rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Real-Time Drawing</h3>
              <p className="text-gray-600">
                Draw, sketch, and annotate collaboratively with instant updates.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-xl rounded-lg p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?teamwork,meeting"
                alt="Team Collaboration"
                className="w-full rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Work together with your team in real time, no matter where you
                are.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-xl rounded-lg p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?brainstorming,ideas"
                alt="Interactive Tools"
                className="w-full rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Interactive Tools</h3>
              <p className="text-gray-600">
                Use a variety of drawing tools, shapes, and integrations to
                bring your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto px-6 text-center text-white">
          <p>
            © {new Date().getFullYear()} Realtime Whiteboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
