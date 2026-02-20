export const genres = [
  'Drama',
  'Comedy',
  'Sports',
  'Food',
  'Family',
  'Romance',
  'Travel',
  'Crime',
  'Thriller',
] as const
export type Genre = (typeof genres)[number]

export const API_BASE_URL = 'https://api.tvmaze.com'
