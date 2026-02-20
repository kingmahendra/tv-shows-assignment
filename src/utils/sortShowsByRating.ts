import type { Show } from '@/model/model'
/*
 * This function sorts and return shows based on rating also shows without rating is appended in
 * in end of sorted list
 */
export function sortShowsByRating(shows: Show[]): Show[] {
  const showsWithRating = shows.filter((show) => show.rating.average !== null)
  const showsWithoutRating = shows.filter((show) => show.rating.average === null)
  const sortedShowsWithRating = [...showsWithRating].sort((showA, showB) => {
    const ratingA = showA.rating.average
    const ratingB = showB.rating.average
    if (ratingA !== null && ratingB !== null) {
      return ratingB - ratingA
    } else {
      return 0
    }
  })
  return [...sortedShowsWithRating, ...showsWithoutRating]
}
