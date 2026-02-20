import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Show } from '@/model/model'
import { genres, API_BASE_URL } from '@/utils/constants'

export const useShowsStore = defineStore('shows', () => {
  const page = ref<number>(1)
  const ids = ref<string[]>([])
  const all = ref<Map<string, Show>>(new Map<string, Show>())
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const selectedShow = ref<Show | null>(null)

  async function fetchShows() {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch(`${API_BASE_URL}/shows?page=${page.value}`)
      const data = (await response.json()) as Show[]
      const newIds: string[] = []
      const newAll: Map<string, Show> = new Map<string, Show>()
      data.forEach((show) => {
        newIds.push(show.id.toString())
        newAll.set(show.id.toString(), show)
      })
      ids.value = newIds
      all.value = newAll
    } catch (err) {
      error.value = 'Fetching shows Failed'
      throw new Error(`Fetching shows Failed : ${err}`)
    } finally {
      loading.value = false
    }
  }

  async function fetchShowDetails(showId: string) {
    if (!showId) return
    loading.value = true
    error.value = ''
    try {
      const response = await fetch(`${API_BASE_URL}/shows/${showId}`)
      selectedShow.value = (await response.json()) as Show
    } catch {
      error.value = 'Fetch Show details Failed'
    } finally {
      loading.value = false
    }
  }

  // Computed property that groups shows by genre
  const showsByGenre = computed(() => {
    const genreMap = new Map<string, Show[]>()

    // Initialize map with all genres from constants
    genres.forEach((genre) => {
      genreMap.set(genre, [])
    })

    // Group shows by their genres
    all.value.forEach((show) => {
      show.genres.forEach((showGenre) => {
        // Only add if the genre exists in our constants
        if (genreMap.has(showGenre)) {
          genreMap.get(showGenre)!.push(show)
        }
      })
    })

    return genreMap
  })

  return {
    ids,
    all,
    loading,
    error,
    showsByGenre,
    selectedShow,
    fetchShows,
    fetchShowDetails,
  }
})
