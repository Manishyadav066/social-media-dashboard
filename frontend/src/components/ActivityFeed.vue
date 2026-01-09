<template>
  <div class="glass-card">
    <h3 style="margin-bottom: 1.5rem;">Recent Activity</h3>
    <div class="activity-list">
      <div v-for="(item, index) in activities" :key="index" class="activity-item">
        <div class="activity-icon" :style="{ background: item.color }">
          <component :is="item.icon" size="16" color="white" />
        </div>
        <div class="activity-content">
          <p class="activity-text">
            <span style="font-weight: 600; color: white;">{{ item.user }}</span>
            {{ item.action }}
            <span style="color: var(--primary);">{{ item.target }}</span>
          </p>
          <span class="activity-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Twitter, Instagram, Linkedin, Heart, UserPlus, MessageCircle } from 'lucide-vue-next';
import { shallowRef } from 'vue';

const activities = shallowRef([
  {
    user: 'Sarah M.',
    action: 'liked your post',
    target: 'Marketing Strategy 2024',
    time: '2 mins ago',
    icon: Heart,
    color: 'linear-gradient(135deg, #ec4899, #be185d)'
  },
  {
    user: 'John Doe',
    action: 'started following you',
    target: '',
    time: '1 hour ago',
    icon: UserPlus,
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  },
  {
    user: 'Tech Daily',
    action: 'commented on',
    target: 'Vue.js Tips',
    time: '3 hours ago',
    icon: MessageCircle,
    color: 'linear-gradient(135deg, #10b981, #047857)'
  }
]);
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0;
  font-size: 0.925rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.activity-time {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-top: 0.25rem;
  display: block;
}
</style>
