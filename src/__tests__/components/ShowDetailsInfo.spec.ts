import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowDetailsInfo from '@/components/ShowDetailsInfo.vue'
import { createMockShow } from '../testUtils'

describe('ShowDetailsInfo', () => {
  it('renders without crashing', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'] })
    const wrapper = mount(ShowDetailsInfo, {
      props: { show: mockShow },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
