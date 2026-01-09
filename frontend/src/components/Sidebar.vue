<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo-box">
        <span>S</span>
      </div>
      <h1 style="font-size: 1.25rem;">SocialDash</h1>
    </div>

    <nav class="nav-menu">
      <router-link to="/" class="nav-link" active-class="active-nav">
        <component :is="LayoutDashboard" size="20" />
        <span>Overview</span>
      </router-link>
      
      <router-link to="/analytics" class="nav-link" active-class="active-nav">
        <component :is="BarChart3" size="20" />
        <span>Analytics</span>
      </router-link>

      <router-link to="/audience" class="nav-link" active-class="active-nav">
        <component :is="Users" size="20" />
        <span>Audience</span>
      </router-link>

      <router-link to="/settings" class="nav-link" active-class="active-nav">
        <component :is="Settings" size="20" />
        <span>Settings</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="glass-card" style="padding: 0.75rem; display: flex; gap: 0.75rem; align-items: center;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(45deg, #a855f7, #ec4899);"></div>
        <div>
          <p style="font-weight: 600; font-size: 0.875rem;">Alex Admin</p>
          <p style="color: var(--text-muted); font-size: 0.75rem;">Pro Plan</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { LayoutDashboard, BarChart3, Users, Settings } from 'lucide-vue-next';
</script>

<style scoped>
/* Scoped overrides if needed, but mostly relying on global style.css */
</style>
