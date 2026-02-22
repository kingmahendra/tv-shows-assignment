import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import App from '../App.vue'
import TheNavigation from '../components/TheNavigation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home</div>' },
    },
    {
      path: '/search-results',
      name: 'search-results',
      component: { template: '<div>Search Results</div>' },
    },
  ],
})

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          TheNavigation: { template: '<nav>Navigation</nav>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders header with TheNavigation component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: { template: '<div>Router View Stub</div>' },
        },
      },
    })

    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)

    const navigation = header.findComponent(TheNavigation)
    expect(navigation.exists()).toBe(true)
  })

  it('renders RouterView component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          TheNavigation: { template: '<nav>Navigation</nav>' },
        },
      },
    })

    const routerView = wrapper.findComponent({ name: 'RouterView' })
    expect(routerView.exists()).toBe(true)
  })
})
