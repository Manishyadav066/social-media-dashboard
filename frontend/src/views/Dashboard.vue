<template>
  <div>
    <h1 style="margin-bottom: 2rem;">Dashboard Overview</h1>
    <div class="dashboard-grid">
      <!-- Stat Cards -->
      <div v-for="stat in stats" :key="stat.title" class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">{{ stat.title }}</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">{{ stat.value }}</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
        <AnalyticsChart />
        <ActivityFeed />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AnalyticsChart from '../components/AnalyticsChart.vue';
import ActivityFeed from '../components/ActivityFeed.vue';

const stats = ref([
  { title: 'Total Followers', value: 'Loading...' },
  { title: 'Engagement Rate', value: 'Loading...' },
  { title: 'New Impressions', value: 'Loading...' }
]);

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/dashboard/stats');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    
    stats.value = [
      { title: 'Total Platforms', value: data.platforms || 0 }, // Adjusted to match API
      { title: 'Total Followers', value: data.totalFollowers?.toLocaleString() || '0' },
      { title: 'Total Engagement', value: data.totalEngagement?.toLocaleString() || '0' }
    ];
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Keep mock/loading state or show error
    stats.value = [
      { title: 'Total Followers', value: '12,345 (Mock)' },
      { title: 'Engagement Rate', value: '5.2% (Mock)' },
      { title: 'New Impressions', value: '45.2k (Mock)' }
    ];
  }
};

onMounted(() => {
  fetchData();
});
</script>
