import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShowCard from '@/components/ShowCard.vue'
import { createMockShow } from '../testUtils'

describe('ShowCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'] })
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays show name', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'] })
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    })
    expect(wrapper.text()).toContain('Test Show')
  })

  it('displays rating', () => {
    const mockShow = createMockShow({ id: 1, name: 'Test Show', genres: ['Drama'], rating: 8.5 })
    const wrapper = mount(ShowCard, {
      props: { show: mockShow },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    })
    expect(wrapper.text()).toContain('8.5')
  })
})
