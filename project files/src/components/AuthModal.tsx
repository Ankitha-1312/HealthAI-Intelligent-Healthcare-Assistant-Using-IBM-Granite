import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, UserPlus, LogIn, Shield, Heart, Stethoscope } from 'lucide-react';

interface AuthModalProps {
  onLogin: (email: string) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  const getNameFromEmail = (email: string) => {
    if (!email) return '';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={handleModalClick}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600 text-white p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center relative">
            <motion.div 
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 30px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isLogin ? (
                <LogIn className="w-10 h-10" />
              ) : (
                <UserPlus className="w-10 h-10" />
              )}
            </motion.div>
            <h2 className="text-3xl font-bold mb-3">
              {isLogin ? 'Welcome Back!' : 'Join HealthAI'}
            </h2>
            <p className="text-blue-100 text-lg">
              {isLogin 
                ? 'Continue your health journey with Dr. HealthAI' 
                : 'Start your personalized healthcare experience'
              }
            </p>
          </div>
        </div>

        {/* Enhanced Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Preview */}
            {email && validateEmail(email) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-800">
                    Welcome, {getNameFromEmail(email)}! 👋
                  </p>
                  <p className="text-sm text-blue-600">
                    This will be your display name in consultations
                  </p>
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-14 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span> {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 ${
                      errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.confirmPassword}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Enhanced Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <motion.div 
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Setting up your session...</span>
                </>
              ) : (
                <>
                  {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                  {isLogin ? 'Start Health Session' : 'Create Health Account'}
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              {isLogin ? "New to HealthAI?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setPassword('');
                setConfirmPassword('');
              }}
              className="mt-2 text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors underline decoration-2 underline-offset-4"
            >
              {isLogin ? 'Create New Account' : 'Sign In Instead'}
            </button>
          </div>

          {/* Enhanced Privacy Notice */}
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-800">Your Privacy & Security</span>
            </div>
            <p className="text-sm text-green-700 leading-relaxed">
              🔒 Your health data is encrypted end-to-end and never shared with third parties. 
              We comply with HIPAA standards to protect your medical information.
            </p>
          </motion.div>

          {/* Health Features Preview */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <Stethoscope className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-blue-800">AI Diagnosis</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <Heart className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-green-800">Health Tips</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
              <Shield className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-medium text-purple-800">24/7 Care</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;