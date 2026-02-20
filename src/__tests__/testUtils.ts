import type { Show } from '../model/model'

export interface CreateMockShowOptions {
  id: number
  name: string
  genres?: string[]
  rating?: number | null
}

export function createMockShow(options: CreateMockShowOptions): Show {
  const { id, name, genres = [], rating = null } = options

  return {
    id,
    url: '',
    name,
    type: '',
    language: '',
    genres,
    status: '',
    runtime: 0,
    averageRuntime: 0,
    premiered: '',
    ended: null,
    officialSite: null,
    schedule: { time: '', days: [] },
    rating: { average: rating },
    weight: 0,
    network: null,
    webChannel: null,
    dvdCountry: null,
    externals: { tvrage: null, thetvdb: null, imdb: null },
    image: { medium: '', original: '' },
    summary: '',
    updated: 0,
    _links: { self: { href: '' } },
  }
}
