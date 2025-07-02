import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Clock, 
  Users, 
  Pill, 
  Calendar,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced machine learning algorithms analyze symptoms and provide preliminary health assessments.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your health data is encrypted and protected with enterprise-grade security measures.',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Get instant health guidance anytime, anywhere with our always-available AI assistant.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Personalized Care',
      description: 'Tailored health recommendations based on your medical history and lifestyle.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Pill,
      title: 'Medication Management',
      description: 'Smart reminders and drug interaction checks to keep you safe and compliant.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Seamlessly book appointments with healthcare providers in your network.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Health Tracking',
      description: 'Monitor vital signs, symptoms, and health trends with comprehensive analytics.',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: MessageSquare,
      title: 'Expert Consultation',
      description: 'Connect with certified healthcare professionals for specialized medical advice.',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-12"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Comprehensive Healthcare Features
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the future of healthcare with our intelligent AI assistant that combines 
          cutting-edge technology with personalized care.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeatureCards;