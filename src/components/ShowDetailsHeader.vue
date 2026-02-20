<script setup lang="ts">
import type { Show } from '@/model/model'
import ShowDetailsInfo from '@/components/ShowDetailsInfo.vue'
import GoBack from './GoBack.vue'

defineProps<{
  show: Show
}>()
</script>

<template>
  <div class="show-header">
    <img v-if="show.image?.medium" :src="show.image.medium" :alt="show.name" class="show-poster" />
    <div class="show-info">
      <ShowDetailsInfo :show="show" />
    </div>
    <GoBack />
  </div>
</template>

<style scoped>
.show-header {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.show-poster {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.show-info {
  flex: 1;
}

.show-info h1 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 2.5rem;
}
</style>
