<template>
  <transition-group name="notification" tag="div" class="notifications-container">
    <div 
      v-for="notification in notifications" 
      :key="notification.id" 
      class="glass-card notification-toast"
      :class="notification.type"
    >
      <div class="notification-icon">
        <span v-if="notification.type === 'success'">✓</span>
        <span v-else>!</span>
      </div>
      <div class="notification-body">
        <p class="notification-title">{{ notification.title }}</p>
        <p class="notification-message">{{ notification.message }}</p>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref([]);
let idCounter = 0;

// Expose method to add notifications
const addNotification = (title, message, type = 'info') => {
  const id = idCounter++;
  notifications.value.push({ id, title, message, type });
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 5000);
};

// Mock incoming notifications
setInterval(() => {
  if (Math.random() > 0.7) {
    addNotification('New Interaction', 'Someone liked your post', 'success');
  }
}, 10000);
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification-toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  min-width: 300px;
  background: rgba(15, 23, 42, 0.9);
  border-left: 4px solid var(--primary);
}

.notification-toast.success { border-left-color: #10b981; }
.notification-toast.error { border-left-color: #ef4444; }

.notification-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.notification-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin: 0;
}

.notification-message {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 2px 0 0 0;
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
