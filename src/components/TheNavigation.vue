<script setup lang="ts"></script>

<template>
  <nav id="nav">
    <RouterLink id="logo" to="/">All TV Shows</RouterLink>
    <RouterLink id="logo" to="/search-results">Search results</RouterLink>
    <RouterLink id="logo" to="/shows/1">Show details</RouterLink>
  </nav>
</template>
<style scoped>
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  padding: 16px;
  background: #0a6b68;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 5px solid #4e6c71;
  z-index: 2;
}
#nav a {
  display: inline-block;
  margin-right: 20px;
  color: white;
  opacity: 0.7;
  transition: 0.2 ease color;
}

#nav a.router-link-active,
#nav a:hover {
  opacity: 1;
}

#logo {
  font-weight: bold;
  font-size: 1.5rem;
  opacity: 1 !important;
}

a {
  text-decoration: none;
  font-weight: bold;
}
#show-more {
  justify-self: flex-end;
}
</style>
