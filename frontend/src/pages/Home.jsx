import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pencil, Users, Move, Square, Circle, Type,
  MessageSquare, Code, FileText, Send,
  Copy, Terminal, MessagesSquare, Play, ChevronRight, Sparkles} from 'lucide-react';

const Home = () => {
  const [text, setText] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTab, setActiveTab] = useState('document');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Transform your ideas into reality with real-time collaboration";
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);

  // for steps
  const [activeStep, setActiveStep] = useState(0);
  const demoSteps = [
    {
      title: "Create Your Workspace",
      description: "Start by creating your personalized workspace where all your ideas come to life.",
      icon: "M12 4v16m8-8H4"
    },
    {
      title: "Invite Your Team",
      description: "Add team members and collaborate in real-time on your projects.",
      icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    },
    {
      title: "Start Drawing",
      description: "Use our intuitive tools to sketch, draw, and annotate your ideas.",
      icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    },
    {
      title: "Real-time Collaboration",
      description: "See changes instantly as your team contributes to the project.",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);

    return () => clearInterval(stepInterval);
  }, []);

  const features = [
    {
      title: "Real-Time Drawing",
      description: "Draw, sketch, and annotate collaboratively with instant updates across all devices.",
      icon: "M8 15.929l6.929-6.929v-2l-8.929 8.929 2 0zm-1.5-1.5l-2-2 8.929-8.929h2l-6.929 6.929z"
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with your team in real-time, no matter where you are located.",
      icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
    },
    {
      title: "Interactive Tools",
      description: "Access a rich set of drawing tools, shapes, and integrations to bring your creative vision to life.",
      icon: "M12 19l7-7 3 3-7 7-3-3z"
    }
  ];

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, 100);
      }
    };

    typeText();

    const featureInterval = setInterval(() => {
      setCurrentFeatureIndex(prev => (prev + 1) % features.length);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(featureInterval);
    };
  }, []);

  // scroll to demo
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    demoSection.scrollIntoView({ behavior: 'smooth' });
  };
  // Animation for demo section
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsDrawing(prev => !prev);
    }, 3000);
    
    return () => clearInterval(animationInterval);
  }, []);
  
  // Animation for typing simulation
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 2000);
    
    return () => clearInterval(typingInterval);
  }, []);


  // latest useEffect
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-8 min-h-[6rem]">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 animate-gradient-x">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl mb-12 text-purple-200 animate-fade-in-up">
          Create, collaborate, and bring your ideas to life with our powerful digital whiteboard platform.
        </p>
        <div className="space-x-6">
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-lg bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"/>
            <span className="relative">Start Creating</span>
            <Sparkles className="w-5 h-5 ml-2" />
          </Link>
          <button 
            onClick={scrollToDemo}
            className="group bg-transparent border-2 border-purple-300 text-purple-200 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-purple-800/30 hover:border-purple-400"
          >
            <span className="flex items-center">
              Watch Demo
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );

  // Enhanced feature card with hover effects
  const FeatureCard = ({ feature, index }) => (
    <div
      className={`transform transition-all duration-500 hover:scale-105 ${
        index === currentFeatureIndex ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setActiveFeature(index)}
      onMouseLeave={() => setActiveFeature(null)}
    >
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300">
        <div className={`w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center mb-6 mx-auto transform transition-all duration-300 ${
          activeFeature === index ? 'scale-110 rotate-12' : ''
        }`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );

  const styles = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 15s ease infinite;
  }

  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // function to render the active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'document':
        return (
          <div className="bg-white/100 p-6 rounded-lg h-full">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">VT</div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">SD</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm">AK</div>
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">CB</div>
              <span className="text-sm text-gray-500">4 people editing</span>
            </div>
            <h3 className="text-lg font-semibold mb-4">Project Documentation</h3>
            <div className="space-y-3">
              <p className="text-gray-800">Our team's mission is to create </p>
              <p className="text-gray-800">Hey team, what do you think about the new design?</p>
              <div className={`border-l-4 border-blue-500 pl-4 ${isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <p className="text-gray-700">We believe in fostering innovation...</p>
              </div>
              
            </div>
          </div>
        );
      
      case 'chat':
        return (
          <div className="bg-white/100 p-4 rounded-lg h-full flex flex-col">
            <div className="flex-1 space-y-4 mb-4">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">NR</div>
                <div className="bg-gray-500 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-white">Hey team, what do you think about the new design?</p>
                </div>
              </div>
              <div className={`flex items-start space-x-2 justify-end transition-opacity duration-600 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-blue-500 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-white">I love the new layout! The colors really pop.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">Mk</div>
              </div>
              
              <div className={`flex items-start space-x-2 justify-start transition-opacity duration-600 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white text-sm">SD</div>
                <div className="bg-gray-500 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-white">Yeah!! The color looks great..</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
              />
              <Send className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="bg-white/100 p-4 rounded-lg h-full font-mono text-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="px-3 py-1 bg-gray-800 text-gray-300 rounded">main.js</div>
                <div className="px-3 py-1 bg-gray-800 text-gray-300 rounded">styles.css</div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Copy className="w-4 h-4" />
                <Terminal className="w-4 h-4" />
              </div>
            </div>
            <div className="text-black space-y-2">
              <div className="text-blue-400">function initApp() {'{'}</div>
              <div className="pl-4">const app = document.getElementById('app');</div>
              <div className={`pl-4 transition-opacity duration-300 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-purple-400">const</span> config = {'{'}  theme: 'dark', 
        language: 'en', 
        fontSize: 16, <br/>
        enableNotifications: true,
        autoSave: false,<br/>
        shortcuts: {'{'}
            save: 'Ctrl+S',
            open: 'Ctrl+O',
            close: 'Ctrl+W' {'}'};
            <br/>
              </div>
              <div className="text-blue-400">{'}'}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  //feature section
  const FeaturesSection = () => (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-overlay animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(0,0,0,0) 70%)`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-6">
            Experience the Future of Collaboration
          </h2>
          <p className="text-purple-200 text-xl max-w-2xl mx-auto">
            Unlock powerful tools that transform how your team works together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:scale-105 group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 h-full border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white text-center">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const DemoSection = () => (
    <section id="demo-section" className="relative py-24 bg-gradient-to-b from-indigo-900 to-gray-900">
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]" />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
          See How It Works
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl overflow-hidden border border-purple-500/20 backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <img 
                src="/api/placeholder/800/450" 
                alt="Demo video placeholder" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="space-y-8">
              {demoSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-500 ${
                    index === activeStep 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-4 opacity-50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${
                      index === activeStep 
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                        : 'bg-gray-800'
                      } flex items-center justify-center`}>
                      <svg 
                        className={`w-6 h-6 ${
                          index === activeStep 
                            ? 'text-purple-400' 
                            : 'text-gray-400'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d={step.icon} 
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${
                        index === activeStep 
                          ? 'text-purple-400' 
                          : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-400 mt-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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
            <Link to="/login" className="text-white hover:text-purple-200 transition duration-300">
              Login
            </Link>
            <Link to="/register" 
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <HeroSection />
      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-30" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8 min-h-[6rem]">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
              {text}
              <span className="animate-pulse">|</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-12 text-purple-200">
            Create, collaborate, and bring your ideas to life with our powerful digital whiteboard platform.
          </p>
          <div className="space-x-6">
            <Link to="/register"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 
                           text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Start Creating
            </Link>
            <button onClick={scrollToDemo} className="bg-transparent border-2 border-purple-300 text-purple-200 font-bold py-4 px-8 rounded-lg hover:bg-purple-800 transition duration-300">
               Watch Demo
            </button>
          </div>
        </div>
      </section> */}

      {/* Interactive Demo Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side text content */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-6">
                Experience Real-Time Collaboration
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Multi-User Editing</h3>
                    <p className="text-gray-400">Watch changes appear instantly as team members contribute.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Pencil className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Drawing Tools</h3>
                    <p className="text-gray-400">Access a complete set of drawing and annotation tools.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-pink-500/20 p-3 rounded-lg">
                    <Move className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Intuitive Interface</h3>
                    <p className="text-gray-400">Smooth, responsive controls for natural interaction.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side animated demo */}
            <div className="lg:w-1/2">
              <div className="bg-gray-800 rounded-xl p-4 shadow-2xl">
                <div className="bg-gray-750 rounded-lg p-2 mb-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="px-4 py-1 bg-gray-700 rounded text-sm text-gray-300">
                    Team Whiteboard - 3 users active
                  </div>
                </div>
                
                {/* Animated Whiteboard Canvas */}
                <div className="relative bg-white rounded-lg aspect-video overflow-hidden">
                  {/* Toolbar */}
                  <div className="absolute top-4 left-4 bg-gray-100 rounded-lg shadow-lg p-2 flex space-x-2">
                    <Pencil className={`w-6 h-6 ${isDrawing ? 'text-blue-500' : 'text-gray-500'}`} />
                    <Square className="w-6 h-6 text-gray-500" />
                    <Circle className="w-6 h-6 text-gray-500" />
                    <Type className="w-6 h-6 text-gray-500" />
                  </div>
                  
                  {/* Animated Drawing Elements */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      className={`transition-all duration-1000 ${isDrawing ? 'opacity-100' : 'opacity-0'}`}
                      d="M50,50 Q100,25 150,50 T250,50"
                      stroke="#4F46E5"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      className={`transition-all duration-1000 ${!isDrawing ? 'opacity-100' : 'opacity-0'}`}
                      cx="150"
                      cy="150"
                      r="50"
                      stroke="#EC4899"
                      strokeWidth="3"
                      fill="none"
                    />
                    <rect
                      className={`transition-all duration-1000 ${isDrawing ? 'opacity-100' : 'opacity-0'}`}
                      x="200"
                      y="100"
                      width="80"
                      height="80"
                      stroke="#8B5CF6"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Cursor Indicators */}
                  <div className={`absolute transition-all duration-500 ${isDrawing ? 'top-1/4' : 'top-3/4'} left-1/4 flex items-center space-x-2`}>
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Sarah</span>
                  </div>
                  <div className={`absolute transition-all duration-500 ${!isDrawing ? 'top-1/3' : 'top-2/3'} right-1/4 flex items-center space-x-2`}>
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Mike</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center mb-16 text-white">
            Powerful Collaboration Tools
          </h2>
          
          <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('document')}
                className={`flex items-center space-x-2 px-6 py-4 ${activeTab === 'document' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-white/60'}`}
              >
                <FileText className="w-5 h-5" />
                <span>Document</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-6 py-4 ${activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-white/60'}`}
              >
                <MessagesSquare className="w-5 h-5" />
                <span>Team Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center space-x-2 px-6 py-4 ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-white/60'}`}
              >
                <Code className="w-5 h-5" />
                <span>Code Editor</span>
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="h-96 p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FileText className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Document Editing</h3>
              <p className="text-gray-600">Collaborate on documents in real-time with your team. See changes as they happen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MessagesSquare className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrated Team Chat</h3>
              <p className="text-gray-600">Keep discussions contextual with built-in chat functionality in every workspace.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Code className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Code Collaboration</h3>
              <p className="text-gray-600">Write, review, and debug code together in real-time with syntax highlighting.</p>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection/>
      <DemoSection/>

      
      {/* Footer */}
      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Realtime Whiteboard</h3>
              <p className="text-purple-200">Bringing teams together, one canvas at a time.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-purple-200 hover:text-white transition duration-300">About</a>
              <a href="#" className="text-purple-200 hover:text-white transition duration-300">Blog</a>
              <a href="#" className="text-purple-200 hover:text-white transition duration-300">Support</a>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-200">
            <p>© {new Date().getFullYear()} Realtime Whiteboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;