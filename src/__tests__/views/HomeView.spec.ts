import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomeView from '@/views/HomeView.vue'
import ShowList from '@/components/ShowList.vue'
import { genres } from '@/utils/constants'

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ShowList: { template: '<div>Show List Stub</div>' },
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders template structure correctly', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ShowList: { template: '<div>Show List Stub</div>' },
        },
      },
    })

    expect(wrapper.find('.home').exists()).toBe(true)
    expect(wrapper.findAll('.home > div')).toHaveLength(genres.length)
  })

  it('renders ShowList component for each genre', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          Suspense: false,
          ShowList: true,
        },
      },
    })

    const showListComponents = wrapper.findAllComponents(ShowList)
    expect(showListComponents).toHaveLength(genres.length)

    genres.forEach((genre, index) => {
      expect(showListComponents[index]?.props('genre')).toBe(genre)
    })
  })

  it('renders home container with proper structure', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ShowList: { template: '<div>Show List Stub</div>' },
        },
      },
    })

    const homeDiv = wrapper.find('.home')
    expect(homeDiv.exists()).toBe(true)

    const genreDivs = wrapper.findAll('.home > div')
    expect(genreDivs).toHaveLength(genres.length)
  })

  it('passes genre prop correctly to ShowList components', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          Suspense: false,
          ShowList: true,
        },
      },
    })

    const showListComponents = wrapper.findAllComponents(ShowList)

    showListComponents.forEach((component, index) => {
      expect(component.props()).toHaveProperty('genre', genres[index])
    })
  })

  it('renders all expected genres', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ShowList: { template: '<div>Show List Stub</div>' },
        },
      },
    })

    const genreContainers = wrapper.findAll('.home > div')
    expect(genreContainers).toHaveLength(genres.length)

    expect(genres).toEqual([
      'Drama',
      'Comedy',
      'Sports',
      'Food',
      'Family',
      'Romance',
      'Travel',
      'Crime',
      'Thriller',
    ])
  })

  it('includes proper CSS classes', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          ShowList: { template: '<div>Show List Stub</div>' },
        },
      },
    })

    expect(wrapper.find('.home').exists()).toBe(true)
  })
})
