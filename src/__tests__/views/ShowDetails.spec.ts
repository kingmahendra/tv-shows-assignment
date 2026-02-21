import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import ShowDetails from '@/views/ShowDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/shows/:id',
      name: 'show-details',
      component: ShowDetails,
    },
  ],
})

describe('ShowDetails', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [router],
        mocks: {
          $route: { params: { id: '1' } },
        },
        stubs: {
          ShowDetailsHeader: { template: '<div>Show Header</div>' },
          ShowDetailsGrid: { template: '<div>Show Grid</div>' },
          ShowDetailsInfo: { template: '<div>Show Info</div>' },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
