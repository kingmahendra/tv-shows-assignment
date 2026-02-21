import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowDetailsGrid from '@/components/ShowDetailsGrid.vue'
import { createMockShow } from '../testUtils'

describe('ShowDetailsGrid', () => {
  it('renders without crashing', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'] })
    const wrapper = mount(ShowDetailsGrid, {
      props: { show: mockShow },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
