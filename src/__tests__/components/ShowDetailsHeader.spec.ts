import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowDetailsHeader from '@/components/ShowDetailsHeader.vue'
import { createMockShow } from '../testUtils'

describe('ShowDetailsHeader', () => {
  it('renders without crashing', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'] })
    const wrapper = mount(ShowDetailsHeader, {
      props: { show: mockShow },
      global: {
        stubs: {
          ShowDetailsInfo: { template: '<div>Show Details Info</div>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
