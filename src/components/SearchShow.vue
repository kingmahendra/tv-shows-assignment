<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
  modelValue?: string
}

interface Emits {
  (event: 'update:modelValue', value: string): void
  (event: 'search', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search TV shows...',
  modelValue: '',
})

const emit = defineEmits<Emits>()

const searchInput = ref<HTMLInputElement>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
}

const handleSearch = () => {
  emit('search', props.modelValue || '')
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <input
        ref="searchInput"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
        @keypress="handleKeyPress"
        class="search-input"
      />
      <button @click="handleSearch" class="search-button" type="button" aria-label="Search">
        <img src="@/assets/search-icon.svg" alt="search button" class="search-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 2px;
  padding: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 25px;
  background: transparent;
}

.search-input::placeholder {
  color: #999;
}

.search-button {
  background: #2a9d8f;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
}

.search-button:hover {
  background: #264653;
}

.search-button:active {
  transform: scale(0.95);
}

.search-icon {
  color: white;
  transition: color 0.2s;
}
</style>
