<template>
  <div>
    <h1 style="margin-bottom: 2rem;">Settings</h1>
    <div style="max-width: 800px;">
      
      <!-- Profile Section -->
      <div class="glass-card" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Profile</h3>
        <div style="display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem;">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(45deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);">
            A
          </div>
          <div>
            <button class="btn-primary" style="margin-right: 1rem;">Change Avatar</button>
            <button style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white;">Remove</button>
          </div>
        </div>
        
        <form @submit.prevent class="form-grid">
          <div class="form-group">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Display Name</label>
            <input type="text" class="form-input" value="Alex Admin">
          </div>
           <div class="form-group">
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Email</label>
            <input type="email" class="form-input" value="alex@example.com">
          </div>
        </form>
      </div>

      <!-- Preferences Section -->
      <div class="glass-card">
        <h3 style="margin-bottom: 1.5rem;">Preferences</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-weight: 500;">Email Notifications</p>
              <p style="font-size: 0.875rem; color: var(--text-muted);">Receive daily summaries</p>
            </div>
            <label class="switch">
              <input type="checkbox" checked>
              <span class="slider"></span>
            </label>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-weight: 500;">Dark Mode</p>
              <p style="font-size: 0.875rem; color: var(--text-muted);">Switch between dark and light themes</p>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="isDarkMode" @change="toggleTheme">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(true);

const toggleTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

onMounted(() => {
  // Check initial state or preference, default is dark (true) so no attr needed
  // If we had persistence we would read it here
});
</script>

<style scoped>
/* Switch Toggle via CSS */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(22px);
  -ms-transform: translateX(22px);
  transform: translateX(22px);
}
</style>
