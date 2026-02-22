import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ThePagination from '@/components/ThePagination.vue'
import { useShowsStore } from '@/stores/shows'

describe('ThePagination', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders without crashing', () => {
    const wrapper = mount(ThePagination)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays pagination controls', () => {
    const wrapper = mount(ThePagination)
    expect(wrapper.find('.pagination-controls').exists()).toBe(true)
    expect(wrapper.find('.pagination-button').exists()).toBe(true)
  })

  it('displays previous and next buttons with correct text', () => {
    const wrapper = mount(ThePagination)
    const buttons = wrapper.findAll('.pagination-button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('<< Prev')
    expect(buttons[1].text()).toBe('Next >>')
  })

  it('disables previous button when on page 1', () => {
    const store = useShowsStore()
    store.page = 1

    const wrapper = mount(ThePagination)
    const prevButton = wrapper.findAll('.pagination-button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('enables previous button when on page greater than 1', () => {
    const store = useShowsStore()
    store.page = 2

    const wrapper = mount(ThePagination)
    const prevButton = wrapper.findAll('.pagination-button')[0]
    expect(prevButton.attributes('disabled')).toBeUndefined()
  })

  it('calls loadPrevious when previous button is clicked', async () => {
    const store = useShowsStore()
    store.page = 2
    const loadPreviousSpy = vi.spyOn(store, 'loadPrevious')

    const wrapper = mount(ThePagination)
    const prevButton = wrapper.findAll('.pagination-button')[0]
    await prevButton.trigger('click')

    expect(loadPreviousSpy).toHaveBeenCalled()
  })

  it('calls loadMore when next button is clicked', async () => {
    const store = useShowsStore()
    const loadMoreSpy = vi.spyOn(store, 'loadMore')

    const wrapper = mount(ThePagination)
    const nextButton = wrapper.findAll('.pagination-button')[1]
    await nextButton.trigger('click')

    expect(loadMoreSpy).toHaveBeenCalled()
  })

  it('shows correct page number', () => {
    const store = useShowsStore()
    store.page = 3

    const wrapper = mount(ThePagination)
    expect(wrapper.text()).toContain('Showing page: 3')
  })
})
