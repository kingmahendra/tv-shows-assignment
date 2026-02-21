<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import ShowCard from '@/components/ShowCard.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { Show } from '@/model/model'
import GoBack from '@/components/GoBack.vue'

const showsStore = useShowsStore()
const searchShows = ref<Show[]>([])
const { loading, error, searchResults } = storeToRefs(showsStore)
watch(
  searchResults,
  (newValue, oldValue) => {
    console.log(oldValue)
    searchShows.value = newValue
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="search-results">
    <div class="header">
      <h1>Search Results</h1>
      <GoBack />
    </div>

    <div v-if="loading" class="loading">
      <p>Searching for shows...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="searchShows.length === 0" class="no-results">
      <p>No shows found. Try searching for something else!</p>
    </div>

    <div v-else class="results">
      <p class="result-count">
        Found {{ searchShows.length }} show{{ searchShows.length !== 1 ? 's' : '' }}
      </p>
      <div class="shows">
        <div v-for="show in searchShows" :key="show.id" class="show-item">
          <ShowCard :show="show" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.search-results .header {
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

.loading,
.error,
.no-results {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.loading {
  color: #3498db;
}

.error {
  color: #e74c3c;
}

.result-count {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.shows {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.show-item {
  width: 100%;
  max-width: 320px;
}

@media (max-width: 768px) {
  .search-results {
    padding: 1rem;
  }

  .shows {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .shows {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .show-item {
    max-width: 100%;
  }
}
</style>
