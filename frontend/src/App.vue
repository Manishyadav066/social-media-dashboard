<template>
  <div class="app-layout">
    <div v-if="!isAuthPage" class="app-container" style="display: flex; width: 100%;">
      <Sidebar />
      <main class="main-content">
        <!-- Background bloopers -->
        <div class="bg-blob blob-1"></div>
        <div class="bg-blob blob-2"></div>
        
        <NotificationSystem />
        <ChatAssistant />

        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <div v-else style="width: 100%;">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import NotificationSystem from './components/NotificationSystem.vue';
import ChatAssistant from './components/ChatAssistant.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAuthPage = computed(() => route.path === '/login' || route.path === '/register');
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
