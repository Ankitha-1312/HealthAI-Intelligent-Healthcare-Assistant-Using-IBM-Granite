import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Droplets } from 'lucide-react';

const HealthMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      status: 'Normal',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Activity,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'Optimal',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'Normal',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Droplets,
      label: 'Hydration',
      value: '85',
      unit: '%',
      status: 'Good',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Real-time Health Monitoring
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`${metric.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric.color} ${metric.bgColor} rounded-full flex items-center justify-center`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.status === 'Normal' || metric.status === 'Optimal' || metric.status === 'Good'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {metric.status}
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-gray-800">{metric.value}</span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HealthMetrics;