<template>
  <div>
    <!-- Floating Button -->
    <button 
      @click="toggleChat"
      class="chat-trigger"
      :class="{ 'hidden': isOpen }"
    >
      <span class="icon">💬</span>
    </button>

    <!-- Chat Window -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window glass-card">
        <div class="chat-header">
          <div class="header-info">
            <div class="bot-avatar">🤖</div>
            <div>
              <p class="bot-name">DashBot AI</p>
              <p class="bot-status">Online</p>
            </div>
          </div>
          <button @click="toggleChat" class="close-btn">×</button>
        </div>

        <div class="chat-messages" ref="messagesContainer">
            <div v-for="(msg, index) in messages" :key="index" class="message-bubble" :class="msg.isUser ? 'user' : 'bot'">
                {{ msg.text }}
            </div>
             <div v-if="isTyping" class="message-bubble bot typing">
                <span>.</span><span>.</span><span>.</span>
            </div>
        </div>

        <form @submit.prevent="sendMessage" class="chat-input-area">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Ask me anything..." 
            class="chat-input"
            :disabled="isTyping"
          >
          <button type="submit" class="send-btn" :disabled="!newMessage.trim() || isTyping">
            ➤
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';

const isOpen = ref(false);
const newMessage = ref('');
const isTyping = ref(false);
const messagesContainer = ref(null);

const messages = ref([
  { text: "Hi! I'm DashBot. Ask me about your social media performance.", isUser: false }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;

  // Add user message
  const userText = newMessage.value;
  messages.value.push({ text: userText, isUser: true });
  newMessage.value = '';
  scrollToBottom();

  isTyping.value = true;

  try {
    const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
    });
    
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    
    messages.value.push({ text: data.reply, isUser: false });
  } catch (error) {
    messages.value.push({ text: "Sorry, I'm having trouble connecting right now.", isUser: false });
  } finally {
    isTyping.value = false;
    scrollToBottom();
  }
};
</script>

<style scoped>
.chat-trigger {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-trigger:hover {
  transform: scale(1.1);
}

.chat-trigger.hidden {
  transform: scale(0);
  pointer-events: none;
}

.icon {
  font-size: 30px;
}

.chat-window {
  position: fixed;
  bottom: 100px; /* Above the button area normally, but button hides */
  right: 30px;
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  overflow: hidden;
  padding: 0; /* Override glass-card default padding */
}

.chat-header {
  padding: 15px;
  background: rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.bot-avatar {
  width: 35px;
  height: 35px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.bot-name {
  font-weight: bold;
  font-size: 14px;
  margin: 0;
}

.bot-status {
  font-size: 12px;
  color: #10b981;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 24px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
}

.message-bubble.user {
  align-self: flex-end;
  background: var(--primary);
  color: white;
  border-bottom-right-radius: 2px;
}

.message-bubble.bot {
  align-self: flex-start;
  background: rgba(255,255,255,0.1);
  color: var(--text-main);
  border-bottom-left-radius: 2px;
}

.typing span {
  animation: blink 1.4s infinite both;
  margin: 0 1px;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}

.chat-input-area {
  padding: 15px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 8px 15px;
  color: white;
  outline: none;
}

.send-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
}

.send-btn:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
