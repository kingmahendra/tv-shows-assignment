import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShowList from '@/components/ShowList.vue'

describe('ShowList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(ShowList, {
      props: { genre: 'Drama' },
      global: {
        stubs: {
          ShowCard: { template: '<div>Show Card</div>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays genre name', () => {
    const wrapper = mount(ShowList, {
      props: { genre: 'Comedy' },
      global: {
        stubs: {
          ShowCard: { template: '<div>Show Card</div>' },
        },
      },
    })
    expect(wrapper.text()).toContain('Comedy')
  })
})
