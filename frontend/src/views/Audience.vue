<template>
  <div>
    <h1 style="margin-bottom: 2rem;">Audience Insights</h1>
    <div class="dashboard-grid">
      <!-- Summary Cards -->
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Total Audience</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">2.4M</p>
        <p style="color: #10b981; font-size: 0.875rem; margin-top: 0.25rem;">+12% this month</p>
      </div>
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Active Users</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">850K</p>
        <p style="color: #10b981; font-size: 0.875rem; margin-top: 0.25rem;">+5% this week</p>
      </div>
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Avg. Time</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">12m 30s</p>
        <p style="color: #f59e0b; font-size: 0.875rem; margin-top: 0.25rem;">-2% vs last week</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <AudienceDemographics />
      
      <div class="glass-card">
        <h3 style="margin-bottom: 1.5rem;">Top Locations</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div v-for="loc in locations" :key="loc.name" style="display: flex; align-items: center; justify-content: space-between;">
             <div style="display: flex; align-items: center; gap: 0.75rem;">
               <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary);"></div>
               <span style="font-weight: 500;">{{ loc.name }}</span>
             </div>
             <div style="flex: 1; margin: 0 1.5rem; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
               <div :style="{ width: loc.percent + '%', background: 'var(--secondary)', height: '100%' }"></div>
             </div>
             <span style="color: var(--text-muted);">{{ loc.percent }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AudienceDemographics from '../components/AudienceDemographics.vue';
import { ref } from 'vue';

const locations = ref([
  { name: 'United States', percent: 45 },
  { name: 'Germany', percent: 15 },
  { name: 'India', percent: 12 },
  { name: 'United Kingdom', percent: 8 },
  { name: 'Canada', percent: 5 }
]);
</script>
