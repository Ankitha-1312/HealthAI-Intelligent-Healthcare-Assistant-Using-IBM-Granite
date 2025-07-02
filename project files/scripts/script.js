// Chat functionality
class HealthAIChat {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        // Get DOM elements
        this.chatModal = document.getElementById('chatModal');
        this.startChatBtn = document.getElementById('startChatBtn');
        this.closeChatBtn = document.getElementById('closeChatBtn');
        this.chatForm = document.getElementById('chatForm');
        this.messageInput = document.getElementById('messageInput');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.quickQuestions = document.querySelectorAll('.quick-question');

        // Bind events
        this.bindEvents();

        // Add initial message
        this.addMessage("Hello! I'm HealthAI, your intelligent healthcare assistant. I'm here to help you with health information, symptoms analysis, medication reminders, and wellness tips. How can I assist you today?", 'ai');
    }

    bindEvents() {
        this.startChatBtn.addEventListener('click', () => this.openChat());
        this.closeChatBtn.addEventListener('click', () => this.closeChat());
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Quick questions
        this.quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sendMessage(btn.textContent);
            });
        });

        // Close modal when clicking outside
        this.chatModal.addEventListener('click', (e) => {
            if (e.target === this.chatModal) {
                this.closeChat();
            }
        });
    }

    openChat() {
        this.chatModal.classList.remove('hidden');
        this.messageInput.focus();
    }

    closeChat() {
        this.chatModal.classList.add('hidden');
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = this.messageInput.value.trim();
        if (message && !this.isTyping) {
            this.sendMessage(message);
            this.messageInput.value = '';
        }
    }

    sendMessage(message) {
        // Add user message
        this.addMessage(message, 'user');
        
        // Hide quick questions after first message
        const quickQuestionsDiv = document.getElementById('quickQuestions');
        if (this.messages.length > 2) {
            quickQuestionsDiv.style.display = 'none';
        }

        // Show typing indicator
        this.showTyping();

        // Simulate AI response delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateAIResponse(message);
            this.addMessage(response.text, 'ai', response.type);
        }, 1500);
    }

    addMessage(text, sender, type = 'text') {
        const messageId = Date.now().toString();
        const timestamp = new Date();
        
        this.messages.push({
            id: messageId,
            text,
            sender,
            timestamp,
            type
        });

        this.renderMessage(text, sender, timestamp, type);
        this.scrollToBottom();
    }

    renderMessage(text, sender, timestamp, type = 'text') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const iconClass = sender === 'user' ? 'fas fa-user' : 
                         type === 'health-tip' ? 'fas fa-heart' :
                         type === 'recommendation' ? 'fas fa-exclamation-circle' : 'fas fa-robot';

        const bubbleColor = sender === 'user' ? 'bg-blue-500 text-white' :
                           type === 'health-tip' ? 'bg-green-50 text-green-800 border border-green-200' :
                           type === 'recommendation' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                           'bg-gray-100 text-gray-800';

        const iconColor = sender === 'user' ? 'bg-blue-500' :
                         type === 'health-tip' ? 'bg-green-500' :
                         type === 'recommendation' ? 'bg-blue-500' : 'bg-gray-500';

        messageDiv.innerHTML = `
            <div class="flex items-start gap-2 max-w-[80%] ${sender === 'user' ? 'flex-row-reverse' : ''}">
                <div class="w-8 h-8 ${iconColor} rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="${iconClass} text-white text-sm"></i>
                </div>
                <div class="${bubbleColor} rounded-2xl px-4 py-3 max-w-none">
                    <p class="text-sm leading-relaxed whitespace-pre-line">${text}</p>
                    <p class="text-xs mt-1 opacity-70 ${sender === 'user' ? 'text-blue-100' : 'text-gray-500'}">
                        ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
    }

    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `
            <div class="flex items-start gap-2">
                <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div class="bg-gray-100 rounded-2xl px-4 py-3">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('headache') || message.includes('head pain')) {
            return {
                text: "I understand you're experiencing a headache. Here are some immediate steps you can take:\n\n• Stay hydrated - drink plenty of water\n• Rest in a quiet, dark room\n• Apply a cold or warm compress\n• Consider gentle neck stretches\n\nIf headaches persist or worsen, please consult with a healthcare professional. Would you like me to help you track your symptoms?",
                type: 'recommendation'
            };
        }
        
        if (message.includes('fever') || message.includes('temperature')) {
            return {
                text: "Fever can be concerning. Here's what I recommend:\n\n• Monitor your temperature regularly\n• Stay hydrated with water and clear fluids\n• Rest and avoid strenuous activities\n• Consider fever-reducing medication if appropriate\n\n⚠️ Seek immediate medical attention if fever exceeds 103°F (39.4°C) or if you experience difficulty breathing, chest pain, or severe symptoms.",
                type: 'recommendation'
            };
        }
        
        if (message.includes('diet') || message.includes('nutrition') || message.includes('food')) {
            return {
                text: "Great question about nutrition! Here are some key principles for a healthy diet:\n\n🥗 Include plenty of fruits and vegetables\n🍗 Choose lean proteins (fish, poultry, legumes)\n🌾 Opt for whole grains over refined ones\n💧 Stay well-hydrated\n🥜 Include healthy fats (nuts, olive oil, avocado)\n\nWould you like personalized nutrition advice based on any specific health goals?",
                type: 'health-tip'
            };
        }
        
        if (message.includes('exercise') || message.includes('workout') || message.includes('fitness')) {
            return {
                text: "Exercise is fantastic for your health! Here are some guidelines:\n\n🏃‍♀️ Aim for 150 minutes of moderate aerobic activity weekly\n💪 Include strength training 2-3 times per week\n🧘‍♀️ Don't forget flexibility and balance exercises\n⏰ Start slowly and gradually increase intensity\n\nRemember to consult with a healthcare provider before starting any new exercise program. What type of activities interest you most?",
                type: 'health-tip'
            };
        }
        
        if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
            return {
                text: "Sleep is crucial for your health. Here are some tips for better sleep:\n\n🌙 Maintain a consistent sleep schedule\n📱 Avoid screens 1 hour before bedtime\n🛏️ Create a comfortable sleep environment\n☕ Limit caffeine after 2 PM\n🧘‍♀️ Try relaxation techniques before bed\n\nMost adults need 7-9 hours of sleep per night. Are you experiencing any specific sleep challenges?",
                type: 'health-tip'
            };
        }
        
        if (message.includes('stress') || message.includes('anxiety') || message.includes('worried')) {
            return {
                text: "I understand you're dealing with stress. Here are some effective strategies:\n\n🧘‍♀️ Practice deep breathing exercises\n🚶‍♀️ Take regular walks in nature\n📝 Try journaling your thoughts\n🎵 Listen to calming music\n👥 Connect with supportive friends/family\n\nIf stress becomes overwhelming, please consider speaking with a mental health professional. Would you like me to guide you through a quick breathing exercise?",
                type: 'recommendation'
            };
        }
        
        // Default responses
        const defaultResponses = [
            {
                text: "I'm here to help with your health questions! I can assist with symptom information, wellness tips, medication reminders, and general health guidance. What specific health topic would you like to discuss?",
                type: 'text'
            },
            {
                text: "Thank you for reaching out! As your AI health assistant, I can provide information about symptoms, healthy lifestyle tips, and general wellness advice. Please remember that I'm not a replacement for professional medical care. How can I help you today?",
                type: 'text'
            },
            {
                text: "I'm designed to support your health journey with evidence-based information and practical tips. Whether you have questions about nutrition, exercise, symptoms, or wellness, I'm here to help. What would you like to know?",
                type: 'text'
            }
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Initialize the chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HealthAIChat();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.slide-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});