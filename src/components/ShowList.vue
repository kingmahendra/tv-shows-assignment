<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import ShowCard from './ShowCard.vue'
import { sortShowsByRating } from '@/utils/sortShowsByRating'
import { computed } from 'vue'

const showsStore = useShowsStore()
const props = defineProps<{
  genre: string
}>()

const sortedShows = computed(() => {
 const shows = showsStore.showsByGenre.get(props.genre) || [];
 return sortShowsByRating(shows)
})

</script>
<template>
  <h2 class="title">{{ genre }}</h2>
  <div class="shows">
    <div v-for="show in sortedShows" :key="show.id">
      <ShowCard :show="show" class="show-item" />
    </div>
  </div>
</template>

<style scoped>
.title {
  padding-left: 0.7rem;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid #2c3e50;
}
.shows {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  overflow-x: scroll;
}
.show-item {
  margin-left: 1rem;
  margin-right: 1rem;
}

@media (max-width: 425px) {
  .shows {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
  }
}
</style>
