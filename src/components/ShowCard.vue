<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Show } from '@/model/model'

const props = defineProps<{
  show: Show | undefined
}>()
</script>

<template>
  <RouterLink
    v-if="props.show"
    :to="{ name: 'show-details', params: { id: props.show.id.toString() } }"
    class="show-link"
  >
    <div class="show">
      <img :src="props.show.image?.medium" :alt="props.show.name" />
      <h2>{{ props.show.name }}</h2>
      <span class="rating">
        Rating:
        <img src="@/assets/star-icon.svg" alt="star rating" class="star-icon" />
        {{ props.show.rating?.average || 'NA' }}
      </span>
    </div>
  </RouterLink>
</template>
<style scoped>
.show-link {
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.show-link:hover .show {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.show {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 415px;
}

.show h2 {
  padding: 1rem;
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}
.rating {
  padding: 0 1rem 1rem 1rem;
  align-self: flex-start;
}

.star-icon {
  width: 16px;
  height: 16px;
  margin: 0 4px;
  vertical-align: middle;
}
</style>
