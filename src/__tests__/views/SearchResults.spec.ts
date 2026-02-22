import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SearchResults from '@/views/SearchResults.vue'

describe('SearchResults', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(SearchResults, {
      global: {
        stubs: {
          ShowCard: { template: '<div>Show Card</div>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays search results title', () => {
    const wrapper = mount(SearchResults, {
      global: {
        stubs: {
          ShowCard: { template: '<div>Show Card</div>' },
        },
      },
    })
    expect(wrapper.text()).toContain('Search Results')
  })
})
