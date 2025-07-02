import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, User, Heart, AlertCircle, Stethoscope, Shield, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'health-tip' | 'recommendation';
}

interface User {
  email: string;
  name: string;
  firstName: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  onClose: () => void;
  user: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
  onClose,
  user,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputMessage);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'health-tip':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'recommendation':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Stethoscope className="w-4 h-4 text-blue-500" />;
    }
  };

  const quickQuestions = [
    "I have a headache",
    "Tell me about healthy diet",
    "How much exercise do I need?",
    "I'm feeling stressed",
    "Sleep problems",
    "Can I take paracetamol for body pain?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        onClick={handleModalClick}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600 text-white p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Enhanced AI Doctor Avatar */}
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(255,255,255,0.3)",
                      "0 0 30px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Stethoscope className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              </div>
              
              <div>
                <h3 className="font-bold text-2xl mb-1">Dr. HealthAI</h3>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online & Ready</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure Session</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* User Welcome Section */}
              <motion.div 
                className="hidden md:block text-right bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-lg font-bold">{user.firstName}</p>
                <p className="text-xs opacity-75">Secure Health Session</p>
              </motion.div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-4 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Enhanced Avatar */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                    : message.type === 'health-tip' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : message.type === 'recommendation'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <div className="text-white">
                      {getMessageIcon(message.type)}
                    </div>
                  )}
                </div>

                {/* Enhanced Message Bubble */}
                <div className={`chat-bubble relative ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : message.type === 'health-tip'
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 border-2 border-green-200 shadow-lg'
                      : message.type === 'recommendation'
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-900 border-2 border-blue-200 shadow-lg'
                        : 'bg-white text-gray-800 border-2 border-gray-200 shadow-lg'
                } max-w-none rounded-3xl p-6`}>
                  
                  {/* Enhanced Message Type Badge */}
                  {message.sender === 'ai' && message.type && (
                    <motion.div 
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold mb-4 ${
                        message.type === 'health-tip' 
                          ? 'bg-green-100 text-green-700 border border-green-300'
                          : message.type === 'recommendation'
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {getMessageIcon(message.type)}
                      {message.type === 'health-tip' ? '💡 Health Tip' : 
                       message.type === 'recommendation' ? '🩺 Medical Guidance' : '📋 Information'}
                    </motion.div>
                  )}

                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.text}
                  </div>
                  
                  <div className={`text-xs mt-3 opacity-70 flex items-center gap-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="chat-bubble bg-white border-2 border-gray-200 shadow-lg rounded-3xl p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Stethoscope className="w-4 h-4" />
                    </motion.div>
                    <span className="font-medium">Dr. HealthAI is analyzing your query...</span>
                  </div>
                  <div className="typing-indicator flex gap-1">
                    <div className="typing-dot bg-indigo-400" style={{ animationDelay: '0ms' }}></div>
                    <div className="typing-dot bg-indigo-400" style={{ animationDelay: '150ms' }}></div>
                    <div className="typing-dot bg-indigo-400" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💡</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Quick questions to get started:</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSendMessage(question)}
                  className="px-4 py-3 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 text-blue-700 hover:text-white rounded-2xl text-sm font-medium transition-all duration-300 border-2 border-blue-200 hover:border-transparent shadow-sm hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Input Section */}
        <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Dr. HealthAI about your health concerns..."
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-500 text-sm"
                disabled={isTyping}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-300 disabled:to-gray-400 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-6 h-6 text-white" />
            </motion.button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <motion.p 
              className="text-xs text-gray-600 text-center bg-amber-50 px-4 py-3 rounded-2xl border border-amber-200 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Shield className="w-4 h-4 text-amber-600" />
              <span>
                <strong>Medical Disclaimer:</strong> This AI provides general health information only. 
                Always consult healthcare professionals for medical diagnosis and treatment.
              </span>
            </motion.p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ChatInterface;