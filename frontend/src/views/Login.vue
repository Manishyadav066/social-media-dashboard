<template>
  <div style="min-h-screen: 100vh; display: flex; align-items: center; justify-content: center;">
    <div class="glass-card" style="width: 100%; max-width: 400px; padding: 2.5rem;">
      <h2 style="text-align: center; margin-bottom: 2rem; font-size: 1.5rem;">Welcome Back</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Username</label>
          <input 
            v-model="username" 
            type="text" 
            class="form-input"
            placeholder="Enter your username"
          >
        </div>
        <div class="form-group">
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.875rem;">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-input"
            placeholder="Enter your password"
          >
        </div>
        <button 
          type="submit" 
          class="btn-primary"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = () => {
  // TODO: Implement actual login logic
  console.log('Logging in with', username.value, password.value);
  router.push('/');
};
</script>
