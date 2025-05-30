<template>
  <div v-if="loading" class="loading-overlay">
    <div class="spinner"></div>
    <span class="loading-text">Carregando...</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ loading: boolean }>()
</script>

<style scoped>
.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #1976d2;
  border-top: 6px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
