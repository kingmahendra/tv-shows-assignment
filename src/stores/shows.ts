import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Show, SearchItem } from '@/model/model'
import { genres, API_BASE_URL } from '@/utils/constants'

export const useShowsStore = defineStore('shows', () => {
  const page = ref<number>(1)
  const showsMap = ref<Map<string, Show>>(new Map<string, Show>())
  const loading = ref<boolean>(true)
  const error = ref<string>('')
  const selectedShow = ref<Show | null>(null)
  const searchResults = ref<Show[]>([])

  // Computed property that groups shows by genre
  const showsByGenre = computed(() => {
    const genreMap = new Map<string, Show[]>()

    // Initialize map with all genres from constants
    genres.forEach((genre) => {
      genreMap.set(genre, [])
    })

    // Group shows by their genres
    showsMap.value.forEach((show) => {
      show.genres.forEach((showGenre) => {
        // Only add if the genre exists in our constants
        if (genreMap.has(showGenre)) {
          genreMap.get(showGenre)!.push(show)
        }
      })
    })

    return genreMap
  })

  async function fetchShows() {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch(`${API_BASE_URL}/shows?page=${page.value}`)
      const data = (await response.json()) as Show[]

      //create a new map with fetch shows and update the showsMap
      const newShowsMap: Map<string, Show> = new Map<string, Show>()
      data.forEach((show) => {
        newShowsMap.set(show.id.toString(), show)
      })
      showsMap.value = newShowsMap
      
    } catch (err) {
      error.value = 'Fetching shows Failed'
      throw new Error(`Fetching shows Failed : ${err}`)
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    page.value += 1
    await fetchShows()
  }

  async function loadPrevious() {
    if (page.value > 1) {
      page.value -= 1
      await fetchShows()
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

  async function searchShows(query: string) {
    if (!query) return
    loading.value = true
    error.value = ''
    try {
      const response = await fetch(`${API_BASE_URL}/search/shows?q=${query}`)
      searchResults.value = (await response.json()).map((item: SearchItem) => item.show) as Show[]
    } catch {
      error.value = 'Search Failed'
    } finally {
      loading.value = false
    }
  }

  return {
    page,
    showsMap,
    loading,
    error,
    showsByGenre,
    selectedShow,
    searchResults,
    fetchShows,
    fetchShowDetails,
    searchShows,
    loadMore,
    loadPrevious,
  }
})
