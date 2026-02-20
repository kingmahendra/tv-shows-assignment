import { describe, it, expect } from 'vitest'
import { sortShowsByRating } from '../../utils/sortShowsByRating'
import { createMockShow } from '../testUtils'

describe('sortShowsByRating', () => {
  it('sorts shows with ratings in descending order', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Show A', rating: 7.5 }),
      createMockShow({ id: 2, name: 'Show B', rating: 9.2 }),
      createMockShow({ id: 3, name: 'Show C', rating: 8.1 }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(3)
    expect(result[0]?.name).toBe('Show B')
    expect(result[1]?.name).toBe('Show C')
    expect(result[2]?.name).toBe('Show A')
  })

  it('places shows without ratings after shows with ratings', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Rated Show', rating: 8.5 }),
      createMockShow({ id: 2, name: 'Unrated Show 1', rating: null }),
      createMockShow({ id: 3, name: 'Another Rated Show', rating: 7.0 }),
      createMockShow({ id: 4, name: 'Unrated Show 2', rating: null }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(4)

    expect(result[0]?.name).toBe('Rated Show')
    expect(result[1]?.name).toBe('Another Rated Show')
    expect(result[2]?.name).toBe('Unrated Show 1')
    expect(result[3]?.name).toBe('Unrated Show 2')
  })

  it('handles all shows having ratings', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Show A', rating: 6.0 }),
      createMockShow({ id: 2, name: 'Show B', rating: 10.0 }),
      createMockShow({ id: 3, name: 'Show C', rating: 8.0 }),
      createMockShow({ id: 4, name: 'Show D', rating: 9.0 }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(4)
    expect(result.map((show) => show.rating.average)).toEqual([10.0, 9.0, 8.0, 6.0])
  })

  it('handles all shows having no ratings', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Show A', rating: null }),
      createMockShow({ id: 2, name: 'Show B', rating: null }),
      createMockShow({ id: 3, name: 'Show C', rating: null }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(3)
    expect(result[0]?.name).toBe('Show A')
    expect(result[1]?.name).toBe('Show B')
    expect(result[2]?.name).toBe('Show C')
  })

  it('handles empty array', () => {
    const result = sortShowsByRating([])
    expect(result).toEqual([])
  })

  it('handles shows with zero ratings', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Zero Rated', rating: 0 }),
      createMockShow({ id: 2, name: 'High Rated', rating: 9.0 }),
      createMockShow({ id: 3, name: 'Low Rated', rating: 1.0 }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(3)
    expect(result[0]?.name).toBe('High Rated')
    expect(result[1]?.name).toBe('Low Rated')
    expect(result[2]?.name).toBe('Zero Rated')
  })

  it('preserves original array order for same ratings', () => {
    const shows = [
      createMockShow({ id: 1, name: 'First 8.0', rating: 8.0 }),
      createMockShow({ id: 2, name: 'Second 8.0', rating: 8.0 }),
      createMockShow({ id: 3, name: 'Third 8.0', rating: 8.0 }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(3)
    expect(result[0]?.name).toBe('First 8.0')
    expect(result[1]?.name).toBe('Second 8.0')
    expect(result[2]?.name).toBe('Third 8.0')
  })

  it('handles decimal ratings correctly', () => {
    const shows = [
      createMockShow({ id: 1, name: 'Show A', rating: 8.75 }),
      createMockShow({ id: 2, name: 'Show B', rating: 8.8 }),
      createMockShow({ id: 3, name: 'Show C', rating: 8.65 }),
    ]

    const result = sortShowsByRating(shows)

    expect(result).toHaveLength(3)
    expect(result[0]?.name).toBe('Show B')
    expect(result[1]?.name).toBe('Show A')
    expect(result[2]?.name).toBe('Show C')
  })
})
