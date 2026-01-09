<template>
  <div>
    <h1 style="margin-bottom: 2rem;">Detailed Analytics</h1>

    <!-- Top Stats -->
    <div class="dashboard-grid">
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Total Impressions</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">1.2M</p>
        <p style="color: #10b981; font-size: 0.875rem; margin-top: 0.25rem;">+18.2%</p>
      </div>
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Avg. Reach</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">450K</p>
        <p style="color: #10b981; font-size: 0.875rem; margin-top: 0.25rem;">+5.4%</p>
      </div>
      <div class="glass-card">
        <h3 style="color: var(--text-muted); font-size: 0.875rem;">Profile Visits</h3>
        <p style="font-size: 1.5rem; font-weight: bold; margin-top: 0.5rem;">22K</p>
        <p style="color: #f59e0b; font-size: 0.875rem; margin-top: 0.25rem;">-1.2%</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
      <!-- Detailed Growth Chart -->
      <div class="glass-card">
        <h3 style="margin-bottom: 1.5rem;">Growth Over Time</h3>
        <div style="position: relative; height: 300px; width: 100%;">
          <canvas ref="growthChartCanvas"></canvas>
        </div>
      </div>

      <!-- Platform Split -->
      <div class="glass-card">
        <h3 style="margin-bottom: 1.5rem;">Platform Distribution</h3>
        <div style="position: relative; height: 300px; width: 100%;">
          <canvas ref="platformChartCanvas"></canvas>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="glass-card">
      <h3 style="margin-bottom: 1.5rem;">Top Performing Posts</h3>
      <table style="width: 100%; border-collapse: collapse; color: var(--text-muted);">
        <thead>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;">
            <th style="padding: 1rem; color: white;">Post</th>
            <th style="padding: 1rem; color: white;">Platform</th>
            <th style="padding: 1rem; color: white;">Reach</th>
            <th style="padding: 1rem; color: white;">Engagement</th>
            <th style="padding: 1rem; color: white;">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 1rem;">{{ post.title }}</td>
            <td style="padding: 1rem;">{{ post.platform }}</td>
            <td style="padding: 1rem;">{{ post.reach }}</td>
            <td style="padding: 1rem;">{{ post.engagement }}</td>
            <td style="padding: 1rem;">{{ post.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

const growthChartCanvas = ref(null);
const platformChartCanvas = ref(null);
let growthChart = null;
let platformChart = null;

const posts = ref([
  { id: 1, title: 'Summer Campaign Launch', platform: 'Instagram', reach: '45k', engagement: '12%', date: 'Oct 24' },
  { id: 2, title: 'Tech Trends 2025', platform: 'Twitter', reach: '12k', engagement: '8%', date: 'Oct 22' },
  { id: 3, title: 'Behind the Scenes', platform: 'LinkedIn', reach: '28k', engagement: '15%', date: 'Oct 20' },
  { id: 4, title: 'Product Teaser', platform: 'Instagram', reach: '33k', engagement: '10%', date: 'Oct 18' }
]);

onMounted(() => {
  // Growth Chart
  const growthCtx = growthChartCanvas.value.getContext('2d');
  growthChart = new Chart(growthCtx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Followers',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#8b5cf6',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { 
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8' }
        },
        x: {
           grid: { display: false },
           ticks: { color: '#94a3b8' }
        }
      }
    }
  });

  // Platform Chart
  const platformCtx = platformChartCanvas.value.getContext('2d');
  platformChart = new Chart(platformCtx, {
    type: 'polarArea',
    data: {
      labels: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook'],
      datasets: [{
        data: [11, 16, 7, 3],
        backgroundColor: [
          'rgba(236, 72, 153, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
       plugins: {
        legend: {
          position: 'right',
          labels: { color: '#cbd5e1' }
        }
      },
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { display: false, backdropColor: 'transparent' }
        }
      }
    }
  });
});

onUnmounted(() => {
  if (growthChart) growthChart.destroy();
  if (platformChart) platformChart.destroy();
});
</script>
