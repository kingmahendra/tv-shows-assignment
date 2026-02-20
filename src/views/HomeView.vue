<script setup lang="ts">
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
      <progress class="progress" max="100">Loading...</progress>
    </template>
  </Suspense>
</template>
<style scoped>
.home {
  margin: 0 auto;
  padding: 1.5rem;
}
.progress {
  margin: 0 auto;
  width: 100%;
  height: 30px;
  background-color: aqua;
}
</style>

