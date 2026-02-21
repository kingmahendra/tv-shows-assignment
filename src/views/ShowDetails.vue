<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import ShowDetailsHeader from '@/components/ShowDetailsHeader.vue'
import ShowDetailsGrid from '@/components/ShowDetailsGrid.vue'

const route = useRoute()
const showsStore = useShowsStore()

onBeforeMount(async () => {
  await showsStore.fetchShowDetails(route.params.id as string)
})

const { loading, error, selectedShow } = storeToRefs(showsStore)
</script>

<template>
  <div class="show-details">
    <div v-if="loading" class="loading">
      <p>Loading show details...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="selectedShow" class="show-content">
      <ShowDetailsHeader :show="selectedShow" />
      <ShowDetailsGrid :show="selectedShow" />
    </div>

    <div v-else class="show-not-found">
      <h2>Show not found</h2>
      <p>The requested show could not be found.</p>
    </div>
  </div>
</template>

<style scoped>
.show-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.show-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.show-content .show {
  max-width: 210px;
}

.loading,
.error,
.show-not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.show-not-found h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}
.show-not-found p {
  color: #7f8c8d;
}
</style>
