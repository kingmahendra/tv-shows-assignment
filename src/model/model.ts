export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string | null
  officialSite: string | null
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: WebChannel | null
  dvdCountry: DvdCountry | null
  externals: Externals
  image: Image
  summary: string
  updated: number
  _links: Links
}

export interface SearchItem {
  score: number
  show: Show
}

export interface Schedule {
  time: string
  days: string[]
}

export interface Rating {
  average: number | null
}

export interface Network {
  id: number
  name: string
  country: Country
  officialSite: string | null
}

export interface Country {
  name: string
  code: string
  timezone: string
}

export interface WebChannel {
  id: number
  name: string
  country: Country | null
  officialSite: string | null
}

export interface DvdCountry {
  name: string
  code: string
  timezone: string
}

export interface Externals {
  tvrage: number | null
  thetvdb: number | null
  imdb: string | null
}

export interface Image {
  medium: string
  original: string
}

export interface Links {
  self: Link
  previousepisode?: Link
}

export interface Link {
  href: string
  name?: string
}
