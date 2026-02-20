<script setup lang="ts">
import type { Show } from '@/model/model'

defineProps<{
  show: Show
}>()
</script>

<template>
  <div class="show-info-section">
    <h1>{{ show.name }}</h1>
    <div class="show-meta">
      <span class="genre" v-for="genre in show.genres" :key="genre">{{ genre }}</span>
      <span class="rating" v-if="show.rating?.average">
        <img src="@/assets/star-icon.svg" alt="star rating" class="star-icon" />
        {{ show.rating.average }}/10
      </span>
      <span class="status">{{ show.status }}</span>
    </div>
    <p class="summary" v-html="show.summary"></p>
  </div>
</template>

<style scoped>
.show-info-section {
  padding: 0 2rem 2rem 2rem;
}

.show-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.genre {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.rating {
  background: #f39c12;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
}

.star-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  filter: brightness(0) invert(1); /* Make star white to contrast with orange background */
}

.status {
  background: #27ae60;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.summary {
  line-height: 1.6;
  color: #555;
}
</style>
