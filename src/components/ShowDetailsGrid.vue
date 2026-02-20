<script setup lang="ts">
import type { Show } from '@/model/model'

defineProps<{
  show: Show
}>()
</script>

<template>
  <div class="show-details-grid">
    <div class="detail-item"><strong>Type:</strong> {{ show.type }}</div>
    <div class="detail-item"><strong>Language:</strong> {{ show.language }}</div>
    <div class="detail-item" v-if="show.premiered">
      <strong>Premiered:</strong> {{ show.premiered }}
    </div>
    <div class="detail-item" v-if="show.ended"><strong>Ended:</strong> {{ show.ended }}</div>
    <div class="detail-item"><strong>Runtime:</strong> {{ show.runtime }} minutes</div>
    <div class="detail-item" v-if="show.network">
      <strong>Network:</strong> {{ show.network.name }}
    </div>
    <div class="detail-item" v-if="show.officialSite">
      <strong>Official Site:</strong>
      <a :href="show.officialSite" target="_blank" rel="noopener noreferrer"> Visit Website </a>
    </div>
  </div>
</template>

<style scoped>
.show-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item strong {
  color: #2c3e50;
  font-size: 0.9rem;
}

.detail-item a {
  color: #3498db;
  text-decoration: none;
}

.detail-item a:hover {
  text-decoration: underline;
}
</style>
