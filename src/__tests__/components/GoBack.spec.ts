import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import GoBack from '@/components/GoBack.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/details', name: 'details', component: { template: '<div>Details</div>' } },
  ],
})

describe('GoBack', () => {
  it('renders without crashing', () => {
    const wrapper = mount(GoBack, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays go back button', () => {
    const wrapper = mount(GoBack, {
      global: {
        plugins: [router],
      },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Go Back')
  })

  it('calls router back when button is clicked', async () => {
    const routerBackSpy = vi.fn()
    router.back = routerBackSpy

    const wrapper = mount(GoBack, {
      global: {
        plugins: [router],
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(routerBackSpy).toHaveBeenCalled()
  })
})
