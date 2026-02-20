<template>
  <span class="back">
    <button @click="$router.back()">Go Back</button>
  </span>
</template>
<style scoped>
.back {
  display: inline-block;
  margin-bottom: 15px;
}
.back button {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
  padding: 0.5rem;
}
</style>
