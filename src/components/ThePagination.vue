<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'

const showsStore = useShowsStore()

async function handleNextClick() {
  await showsStore.loadMore()
}

async function handlePreviousClick() {
  await showsStore.loadPrevious()
}
</script>
<template>
  <div class="pagination-controls">
    <button @click="handlePreviousClick" :disabled="showsStore.page <= 1" class="pagination-button">
      << Prev
    </button>
    <p>Showing page: {{ showsStore.page }}</p>
    <button @click="handleNextClick" class="pagination-button">Next >></button>
  </div>
</template>
<style scoped>

.pagination-controls {
  display: flex;
  gap: 10px;
}

.pagination-button {
  color: white;
  background-color: #064f4c;
  border: none;
  padding: 4px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #065956;
}

.pagination-button:disabled {
  background-color: #7f8c8d;
  cursor: not-allowed;
}

.pagination-button:active:not(:disabled) {
  background-color: #1a252f;
}
</style>
