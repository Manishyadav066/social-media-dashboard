<template>
  <div class="glass-card">
    <h3 style="margin-bottom: 1.5rem;">Audience Demographics</h3>
    <div style="position: relative; height: 300px; width: 100%;">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['18-24', '25-34', '35-44', '45+'],
      datasets: [{
        data: [35, 45, 15, 5],
        backgroundColor: [
          '#8b5cf6', // Primary
          '#ec4899', // Secondary
          '#06b6d4', // Accent
          '#64748b'  // Gray
        ],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#cbd5e1',
            font: {
              family: 'Inter',
              size: 14
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 10
        }
      },
      cutout: '70%'
    }
  });
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
