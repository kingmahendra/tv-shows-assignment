import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import { createMockShow } from '../testUtils'
import { genres } from '@/utils/constants'
import type { Show } from '@/model/model'

const fetchMock = vi.fn()
global.fetch = fetchMock

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have empty ids array and empty all map', () => {
      const store = useShowsStore()
      expect(store.ids).toEqual([])
      expect(store.all.size).toBe(0)
    })
  })

  describe('fetchShows', () => {
    it('should fetch shows and populate ids and all correctly', async () => {
      const mockShows = [
        createMockShow({ id: 1, name: 'Show 1', genres: ['Drama'] }),
        createMockShow({ id: 2, name: 'Show 2', genres: ['Comedy'] }),
        createMockShow({ id: 3, name: 'Show 3', genres: ['Drama', 'Comedy'] }),
      ]

      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve(mockShows),
      })

      const store = useShowsStore()
      await store.fetchShows()

      expect(fetchMock).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=1')
      expect(store.ids).toEqual(['1', '2', '3'])
      expect(store.all.size).toBe(3)
      expect(store.all.get('1')?.name).toBe('Show 1')
      expect(store.all.get('2')?.name).toBe('Show 2')
      expect(store.all.get('3')?.name).toBe('Show 3')
    })

    it('should handle empty response', async () => {
      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve([]),
      })

      const store = useShowsStore()
      await store.fetchShows()

      expect(store.ids).toEqual([])
      expect(store.all.size).toBe(0)
    })

    it('should handle fetch error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'))

      const store = useShowsStore()

      await expect(store.fetchShows()).rejects.toThrow('Network error')
      expect(store.ids).toEqual([])
      expect(store.all.size).toBe(0)
    })
  })

  describe('showsByGenre', () => {
    it('should initialize with all genres from constants as empty arrays', () => {
      const store = useShowsStore()
      const result = store.showsByGenre

      genres.forEach((genre) => {
        expect(result.has(genre)).toBe(true)
        expect(result.get(genre)).toEqual([])
      })
    })

    it('should group shows by single genre', () => {
      const store = useShowsStore()

      const mockShows = [
        createMockShow({ id: 1, name: 'Drama Show', genres: ['Drama'] }),
        createMockShow({ id: 2, name: 'Comedy Show', genres: ['Comedy'] }),
        createMockShow({ id: 3, name: 'Crime Show', genres: ['Crime'] }),
      ]

      const ids = mockShows.map((show) => show.id.toString())
      const all = new Map(mockShows.map((show) => [show.id.toString(), show]))

      store.ids = ids
      store.all = all

      const result = store.showsByGenre

      expect(result.get('Drama')).toHaveLength(1)
      expect(result.get('Drama')?.[0]?.name).toBe('Drama Show')

      expect(result.get('Comedy')).toHaveLength(1)
      expect(result.get('Comedy')?.[0]?.name).toBe('Comedy Show')

      expect(result.get('Crime')).toHaveLength(1)
      expect(result.get('Crime')?.[0]?.name).toBe('Crime Show')

      expect(result.get('Sports')).toEqual([])
      expect(result.get('Food')).toEqual([])
    })

    it('should group shows with multiple genres correctly', () => {
      const store = useShowsStore()

      const mockShows = [
        createMockShow({ id: 1, name: 'Multi-Genre Show', genres: ['Drama', 'Crime', 'Thriller'] }),
      ]

      store.ids = ['1']
      store.all = new Map([['1', mockShows[0] as Show]])

      const result = store.showsByGenre

      expect(result.get('Drama')).toHaveLength(1)
      expect(result.get('Drama')?.[0]?.name).toBe('Multi-Genre Show')

      expect(result.get('Crime')).toHaveLength(1)
      expect(result.get('Crime')?.[0]?.name).toBe('Multi-Genre Show')

      expect(result.get('Thriller')).toHaveLength(1)
      expect(result.get('Thriller')?.[0]?.name).toBe('Multi-Genre Show')
    })

    it('should ignore genres not in constants', () => {
      const store = useShowsStore()

      const mockShows = [
        createMockShow({ id: 1, name: 'Unknown Genre Show', genres: ['Unknown Genre', 'Drama'] }),
      ]

      store.ids = ['1']
      store.all = new Map([['1', mockShows[0] as Show]])

      const result = store.showsByGenre

      expect(result.get('Drama')).toHaveLength(1)
      expect(result.get('Drama')?.[0]?.name).toBe('Unknown Genre Show')

      expect(result.has('Unknown Genre')).toBe(false)
    })

    it('should handle multiple shows in same genre', () => {
      const store = useShowsStore()

      const mockShows = [
        createMockShow({ id: 1, name: 'Drama Show 1', genres: ['Drama'] }),
        createMockShow({ id: 2, name: 'Drama Show 2', genres: ['Drama'] }),
        createMockShow({ id: 3, name: 'Comedy Show', genres: ['Comedy'] }),
      ]

      store.ids = ['1', '2', '3']
      store.all = new Map<string, Show>([
        ['1', mockShows[0] as Show],
        ['2', mockShows[1] as Show],
        ['3', mockShows[2] as Show],
      ])

      const result = store.showsByGenre

      expect(result.get('Drama')).toHaveLength(2)
      expect(result.get('Drama')?.map((show) => show.name)).toEqual([
        'Drama Show 1',
        'Drama Show 2',
      ])

      expect(result.get('Comedy')).toHaveLength(1)
      expect(result.get('Comedy')?.[0]?.name).toBe('Comedy Show')
    })

    it('should update reactively when shows change', () => {
      const store = useShowsStore()

      expect(store.showsByGenre.get('Drama')).toEqual([])

      const mockShow = createMockShow({ id: 1, name: 'New Drama Show', genres: ['Drama'] })
      store.ids = ['1']
      store.all = new Map([['1', mockShow]])

      expect(store.showsByGenre.get('Drama')).toHaveLength(1)
      expect(store.showsByGenre.get('Drama')?.[0]?.name).toBe('New Drama Show')
    })
  })
})
