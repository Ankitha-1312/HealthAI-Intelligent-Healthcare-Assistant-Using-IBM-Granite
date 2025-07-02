import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Stethoscope
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import HealthMetrics from './components/HealthMetrics';
import FeatureCards from './components/FeatureCards';
import Header from './components/Header';
import AuthModal from './components/AuthModal';

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

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('healthai_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('healthai_user');
      }
    }
  }, []);

  // Initialize chat messages when user logs in
  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hello ${user.firstName}! 👋 I'm Dr. HealthAI, your personal medical assistant. I'm here to help you with health information, symptom analysis, medication guidance, and wellness recommendations. 

How can I assist you with your health today?`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [user, messages.length]);

  const handleStartConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Start consultation clicked, user:', user);
    
    if (!user) {
      console.log('No user, showing auth modal');
      setShowAuth(true);
      setShowChat(false);
    } else {
      console.log('User exists, showing chat');
      setShowChat(true);
      setShowAuth(false);
    }
  };

  const handleLogin = (email: string) => {
    // Extract name from email (before @)
    const emailName = email.split('@')[0];
    const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    
    const userData: User = {
      email,
      name: emailName,
      firstName
    };

    setUser(userData);
    localStorage.setItem('healthai_user', JSON.stringify(userData));
    setShowAuth(false);
    setShowChat(true);
  };

  const handleLogout = () => {
    setUser(null);
    setMessages([]);
    localStorage.removeItem('healthai_user');
    setShowChat(false);
    setShowAuth(false);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, user?.firstName || 'there');
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, userName: string): { text: string; type: 'text' | 'health-tip' | 'recommendation' } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('headache') || message.includes('head pain')) {
      return {
        text: `I understand you're experiencing a headache, ${userName}. Here's my medical assessment and recommendations:

🔍 **Immediate Relief Steps:**
• Stay hydrated - drink 2-3 glasses of water slowly
• Rest in a quiet, dark room for 15-30 minutes
• Apply a cold compress to your forehead or warm compress to neck
• Gentle neck and shoulder stretches
• Consider over-the-counter pain relief if appropriate

⚠️ **When to Seek Immediate Care:**
• Sudden, severe headache unlike any before
• Headache with fever, stiff neck, or rash
• Headache after head injury
• Vision changes or difficulty speaking

Would you like me to help you track your headache patterns or discuss potential triggers?`,
        type: 'recommendation'
      };
    }
    
    if (message.includes('fever') || message.includes('temperature')) {
      return {
        text: `${userName}, fever requires careful monitoring. Here's my clinical guidance:

🌡️ **Fever Management Protocol:**
• Monitor temperature every 2-4 hours
• Stay well-hydrated with water, clear broths, or electrolyte solutions
• Rest and avoid strenuous activities
• Light, breathable clothing
• Consider fever-reducing medication (acetaminophen/ibuprofen) as directed

🚨 **Seek Emergency Care If:**
• Temperature exceeds 103°F (39.4°C)
• Difficulty breathing or chest pain
• Severe dehydration signs
• Persistent vomiting
• Confusion or severe headache

How long have you had the fever? Any other symptoms I should know about?`,
        type: 'recommendation'
      };
    }
    
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food')) {
      return {
        text: `Excellent question about nutrition, ${userName}! Here's my evidence-based dietary guidance:

🥗 **Optimal Nutrition Framework:**
• **Vegetables & Fruits:** 5-9 servings daily (variety of colors)
• **Lean Proteins:** Fish, poultry, legumes, nuts (0.8g per kg body weight)
• **Whole Grains:** Brown rice, quinoa, oats over refined grains
• **Healthy Fats:** Olive oil, avocados, nuts, fatty fish
• **Hydration:** 8-10 glasses of water daily

📊 **Meal Timing:**
• Eat every 3-4 hours to maintain stable blood sugar
• Larger breakfast, moderate lunch, lighter dinner
• Stop eating 2-3 hours before bedtime

Do you have any specific health goals or dietary restrictions I should consider for personalized recommendations?`,
        type: 'health-tip'
      };
    }
    
    if (message.includes('exercise') || message.includes('workout') || message.includes('fitness')) {
      return {
        text: `Great focus on fitness, ${userName}! Here's my professional exercise prescription:

💪 **Weekly Exercise Guidelines:**
• **Cardio:** 150 minutes moderate OR 75 minutes vigorous
• **Strength Training:** 2-3 sessions targeting all major muscle groups
• **Flexibility:** Daily stretching, yoga 2-3x weekly
• **Balance:** Especially important for adults 65+

🏃‍♀️ **Progressive Training Plan:**
• Week 1-2: Start with 15-20 minutes, 3x weekly
• Week 3-4: Increase to 25-30 minutes
• Week 5+: Build to full recommendations

⚠️ **Safety First:**
• Warm up 5-10 minutes before exercise
• Cool down and stretch after
• Listen to your body - rest when needed
• Consult me before starting if you have health conditions

What type of activities do you enjoy? I can create a personalized plan for you.`,
        type: 'health-tip'
      };
    }
    
    if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
      return {
        text: `Sleep is crucial for your health, ${userName}. Here's my sleep medicine guidance:

😴 **Sleep Hygiene Protocol:**
• **Consistent Schedule:** Same bedtime/wake time daily (even weekends)
• **Sleep Environment:** Cool (65-68°F), dark, quiet room
• **Pre-sleep Routine:** 1 hour wind-down with relaxing activities
• **Digital Curfew:** No screens 1 hour before bed
• **Bedroom Use:** Only for sleep and intimacy

☕ **Lifestyle Factors:**
• No caffeine after 2 PM
• Avoid large meals 3 hours before bed
• Regular exercise (but not within 4 hours of bedtime)
• Limit daytime naps to 20-30 minutes

🎯 **Sleep Duration Targets:**
• Adults: 7-9 hours nightly
• Quality matters as much as quantity

Are you experiencing difficulty falling asleep, staying asleep, or early morning awakening?`,
        type: 'health-tip'
      };
    }
    
    if (message.includes('stress') || message.includes('anxiety') || message.includes('worried')) {
      return {
        text: `I understand you're dealing with stress, ${userName}. Here's my comprehensive stress management approach:

🧘‍♀️ **Immediate Stress Relief:**
• **4-7-8 Breathing:** Inhale 4, hold 7, exhale 8 seconds
• **Progressive Muscle Relaxation:** Tense and release muscle groups
• **Mindfulness:** 5-minute focused breathing or meditation
• **Physical Movement:** 10-minute walk or gentle stretching

🌱 **Long-term Stress Management:**
• Regular exercise (natural stress reducer)
• Adequate sleep (7-9 hours)
• Social connections and support
• Time management and boundary setting
• Hobbies and enjoyable activities

📝 **Stress Tracking:**
• Keep a stress diary to identify triggers
• Rate stress levels 1-10 daily
• Note what helps vs. what doesn't

🚨 **When to Seek Professional Help:**
• Persistent anxiety affecting daily life
• Sleep disturbances lasting weeks
• Physical symptoms (chest pain, headaches)
• Thoughts of self-harm

Would you like me to guide you through a quick stress-relief technique right now?`,
        type: 'recommendation'
      };
    }

    if (message.includes('paracetamol') || message.includes('acetaminophen') || message.includes('pain relief')) {
      return {
        text: `Good question about paracetamol (acetaminophen), ${userName}. Here's my clinical guidance:

💊 **Paracetamol Usage Guidelines:**
• **Adult Dosage:** 500-1000mg every 4-6 hours
• **Maximum Daily:** 4000mg (4g) in 24 hours - NEVER exceed this
• **Duration:** Use for shortest time necessary
• **With/Without Food:** Can be taken on empty stomach

✅ **Effective For:**
• Mild to moderate pain (headaches, muscle aches, toothache)
• Fever reduction
• Arthritis pain
• Post-surgical pain

⚠️ **Important Safety Information:**
• Check ALL medications for paracetamol content (many contain it)
• Avoid alcohol while taking paracetamol
• Liver damage risk with overdose or chronic high-dose use
• Consult doctor if pain persists beyond 3 days

🚨 **Seek Medical Attention If:**
• Pain worsens despite medication
• Signs of allergic reaction (rash, swelling, difficulty breathing)
• Nausea, vomiting, or stomach pain while taking

What type of pain are you experiencing? This will help me provide more specific guidance.`,
        type: 'recommendation'
      };
    }

    if (message.includes('medication') || message.includes('medicine') || message.includes('drug')) {
      return {
        text: `I'm here to help with medication guidance, ${userName}. Here's my pharmaceutical consultation approach:

💊 **Medication Safety Principles:**
• **Right Dose:** Follow prescribed amounts exactly
• **Right Time:** Take at consistent intervals
• **Right Duration:** Complete full course as directed
• **Right Storage:** Follow temperature and light requirements

📋 **Before Taking Any Medication:**
• Read all labels and instructions carefully
• Check expiration dates
• Verify you're not allergic to any ingredients
• Consider interactions with other medications/supplements

🔍 **Common Medication Questions I Can Help With:**
• Dosage and timing guidance
• Side effects and what to expect
• Drug interactions and contraindications
• Over-the-counter vs. prescription options
• Safe storage and disposal

⚠️ **Always Consult Your Doctor For:**
• Prescription medication changes
• Severe side effects
• Drug allergies or reactions
• Medication not working as expected

What specific medication question can I help you with today?`,
        type: 'recommendation'
      };
    }
    
    // Default responses with user's name
    const defaultResponses: Array<{ text: string; type: 'text' | 'health-tip' | 'recommendation' }> = [
      {
        text: `Thank you for reaching out, ${userName}! As your AI medical assistant, I can help with:

🩺 **Medical Consultations:**
• Symptom analysis and guidance
• Medication information and safety
• Health condition explanations
• When to seek medical care

💡 **Wellness Support:**
• Nutrition and diet planning
• Exercise recommendations
• Sleep optimization
• Stress management techniques

📊 **Health Monitoring:**
• Symptom tracking
• Medication reminders
• Health goal setting
• Preventive care guidance

What specific health topic would you like to discuss today?`,
        type: 'text'
      },
      {
        text: `Hello ${userName}! I'm here to provide you with evidence-based health information and guidance. 

I can assist with symptom assessment, medication questions, lifestyle recommendations, and help you understand when professional medical care is needed.

Remember, while I provide comprehensive health information, I'm not a replacement for professional medical diagnosis or treatment.

How can I support your health journey today?`,
        type: 'text'
      },
      {
        text: `Hi ${userName}! I'm designed to be your trusted health companion, offering:

🔬 **Clinical Knowledge:** Evidence-based medical information
🎯 **Personalized Care:** Tailored to your specific questions
⚡ **24/7 Availability:** Always here when you need health guidance
🛡️ **Safety First:** Clear guidance on when to seek professional care

What health concern or question can I help you with right now?`,
        type: 'text'
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <motion.div 
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Health<span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your intelligent healthcare companion powered by advanced AI. Get personalized health insights, 
            symptom analysis, and wellness recommendations 24/7.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartConsultation}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            {user ? `Continue Consultation` : 'Start Health Consultation'}
          </motion.button>

          {user && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-gray-600"
            >
              Welcome back, <span className="font-semibold text-blue-600">{user.firstName}</span>! 
              Ready for your health consultation?
            </motion.p>
          )}
        </motion.section>

        {/* Health Metrics */}
        <HealthMetrics />

        {/* Feature Cards */}
        <FeatureCards />
      </main>

      {/* Auth Modal */}
      <AnimatePresence mode="wait">
        {showAuth && (
          <AuthModal
            onLogin={handleLogin}
            onClose={handleCloseAuth}
          />
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence mode="wait">
        {showChat && user && (
          <ChatInterface
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onClose={handleCloseChat}
            user={user}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;