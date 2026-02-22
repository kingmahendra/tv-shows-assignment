<script setup lang="ts">
import TheLoader from '@/components/TheLoader.vue';
import ShowList from '../components/ShowList.vue'
import { genres } from '@/utils/constants'
</script>
<template>
  <Suspense>
    <template #default>
      <div class="home">
        <div v-for="genre in genres" :key="genre">
          <ShowList :genre />
        </div>
      </div>
    </template>
    <template #fallback>
      <TheLoader/>
    </template>
  </Suspense>
</template>
<style scoped>
.home {
  margin: 0 auto;
  padding: 1.5rem;
}
</style>
