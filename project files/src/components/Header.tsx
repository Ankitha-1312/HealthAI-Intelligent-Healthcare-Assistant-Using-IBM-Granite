import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Brain, LogOut, UserCircle } from 'lucide-react';

interface User {
  email: string;
  name: string;
  firstName: string;
}

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">HealthAI</h1>
              <p className="text-xs text-gray-500">Powered by Advanced AI</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            {/* Navigation for larger screens */}
            <motion.nav 
              className="hidden md:flex items-center gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
            </motion.nav>

            {/* User Section */}
            {user && (
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">Hello, {user.firstName}!</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Sign Out</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;