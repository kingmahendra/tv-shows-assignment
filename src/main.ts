import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useShowsStore } from './stores/shows'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const showsStore = useShowsStore()
Promise.resolve([showsStore.fetchShows()])
  .then(() => {
    app.use(router)
    app.mount('#app')
  })
  .catch(() => {
    alert(`Show fetching failed, Kindly refresh the page`)
  })
