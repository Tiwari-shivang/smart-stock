import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui';
import LoginAnim from '@/assets/anim/LoginAnim.json';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation - accept any non-empty values
    if (email.trim() && password.trim()) {
      console.log('Login successful:', { email, password });
      // Redirect to dashboard
      navigate('/');
    } else {
      console.log('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-ss-bg">
      {/* Left Section - Lottie Animation */}
      <div className="hidden lg:flex items-center justify-center bg-transparent p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg"
        >
          <Lottie
            animationData={LoginAnim}
            loop={true}
            autoplay={true}
            className="w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Right Section - Login Form with Blob Background */}
      <div className="relative flex items-center justify-center p-4 sm:p-8 overflow-hidden col-span-1 lg:col-span-1">
        {/* Oversized Dramatic Blob Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Blob - Ultra Large */}
          <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%]">
            <svg
              viewBox="0 0 800 800"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="primaryBlobGradient" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#eb0e2a" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#ff6c01" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#147450" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#eb0e2a" stopOpacity="0.1" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M400,100 C600,120 700,250 680,400 C660,600 500,720 350,680 C150,630 80,450 120,300 C160,150 250,80 400,100 Z"
                fill="url(#primaryBlobGradient)"
                filter="url(#glow)"
                className="animate-pulse"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 400 400"
                  to="360 400 400"
                  dur="60s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* Secondary Blob - Medium */}
          <div className="absolute -bottom-1/3 -left-1/4 w-[150%] h-[150%] opacity-60">
            <svg
              viewBox="0 0 600 600"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="secondaryBlobGradient" cx="70%" cy="70%">
                  <stop offset="0%" stopColor="#147450" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#ff6c01" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#eb0e2a" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <path
                d="M300,80 C450,90 550,180 520,300 C490,450 380,520 280,500 C130,475 70,350 90,250 C110,150 200,70 300,80 Z"
                fill="url(#secondaryBlobGradient)"
                className="animate-pulse"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="360 300 300"
                  to="0 300 300"
                  dur="45s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* Tertiary Blob - Small Accent */}
          <div className="absolute top-1/4 -left-1/6 w-[80%] h-[80%] opacity-40">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="tertiaryBlobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6c01" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#147450" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <ellipse
                cx="200"
                cy="200"
                rx="150"
                ry="100"
                fill="url(#tertiaryBlobGradient)"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="scale"
                  values="1;1.2;1"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </svg>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-ss-primary rounded-full opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-ss-primary to-ss-blue rounded-full animate-bounce"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/80 dark:bg-ss-background-dark/80 rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.12)] p-6 sm:p-8 border border-white/20 dark:border-ss-line/20 backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 dark:from-ss-background-dark/90 dark:to-ss-background-dark/70 relative overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="relative inline-block">
                    <img
                      src="https://ik.imagekit.io/r3grqaeps/static_site_imgs/appLogo.png?updatedAt=1760002106861"
                      alt="7-Eleven SmartStock"
                      className="h-[60px] w-[70px] mx-auto drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ss-primary/20 to-ss-blue/20 rounded-full blur-xl"></div>
                  </div>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-3xl font-bold bg-gradient-to-r from-ss-text via-ss-primary to-ss-blue bg-clip-text text-transparent mb-3"
                >
                  Welcome Back
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-ss-subtle text-lg"
                >
                  Sign in to your SmartStock account
                </motion.p>
              </div>

              {/* Login Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ss-text mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ss-subtle w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-white/60 dark:bg-ss-background-dark/60 border border-white/30 dark:border-ss-line/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ss-primary/50 focus:border-ss-primary/50 focus:bg-white/80 dark:focus:bg-ss-background-dark/80 transition-all duration-300 text-ss-text placeholder-ss-subtle backdrop-blur-sm shadow-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-ss-text mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ss-subtle w-5 h-5" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-4 bg-white/60 dark:bg-ss-background-dark/60 border border-white/30 dark:border-ss-line/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ss-primary/50 focus:border-ss-primary/50 focus:bg-white/80 dark:focus:bg-ss-background-dark/80 transition-all duration-300 text-ss-text placeholder-ss-subtle backdrop-blur-sm shadow-lg"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ss-subtle hover:text-ss-text transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-ss-primary hover:text-ss-primary-dark transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-ss-primary via-ss-blue to-ss-green hover:from-ss-primary-dark hover:via-ss-blue-dark hover:to-ss-green text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-[0_8px_32px_rgba(235,14,42,0.3)] hover:shadow-[0_12px_48px_rgba(235,14,42,0.4)] relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-ss-subtle">
                  Don't have an account?{' '}
                  <button className="text-ss-primary hover:text-ss-primary-dark font-medium transition-colors">
                    Contact Administrator
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};