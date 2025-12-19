<template>
  <div class="dashboard-view">
    <StatsDashboard />
  </div>
</template>

<script setup>
import StatsDashboard from '@/components/dashboard/StatsDashboard.vue'
</script>

<style scoped>
.dashboard-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}
</style>