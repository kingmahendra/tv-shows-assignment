import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchShow from '@/components/SearchShow.vue'

describe('SearchShow', () => {
  it('renders search input and button', () => {
    const wrapper = mount(SearchShow)

    const input = wrapper.find('.search-input')
    const button = wrapper.find('.search-button')
    const searchIcon = wrapper.find('.search-icon')

    expect(input.exists()).toBe(true)
    expect(button.exists()).toBe(true)
    expect(searchIcon.exists()).toBe(true)
  })

  it('displays default placeholder text', () => {
    const wrapper = mount(SearchShow)

    const input = wrapper.find('.search-input')
    expect(input.attributes('placeholder')).toBe('Search TV shows...')
  })

  it('emits search event when button is clicked', async () => {
    const wrapper = mount(SearchShow, {
      props: {
        modelValue: 'Breaking Bad',
      },
    })

    const button = wrapper.find('.search-button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted().search).toHaveLength(1)
    expect(wrapper.emitted().search?.[0]).toEqual(['Breaking Bad'])
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(SearchShow)

    const input = wrapper.find('.search-input')
    await input.setValue('The Office')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['The Office'])
  })

  it('emits search event when Enter key is pressed', async () => {
    const wrapper = mount(SearchShow, {
      props: {
        modelValue: 'Friends',
      },
    })

    const input = wrapper.find('.search-input')
    await input.trigger('keypress', { key: 'Enter' })

    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted().search).toHaveLength(1)
    expect(wrapper.emitted().search?.[0]).toEqual(['Friends'])
  })

  it('does not emit search event for other keys', async () => {
    const wrapper = mount(SearchShow, {
      props: {
        modelValue: 'Stranger Things',
      },
    })

    const input = wrapper.find('.search-input')
    await input.trigger('keypress', { key: 'a' })

    expect(wrapper.emitted().search).toBeUndefined()
  })

  it('emits empty string when searching with no value', async () => {
    const wrapper = mount(SearchShow, {
      props: {
        modelValue: '',
      },
    })

    const button = wrapper.find('.search-button')
    await button.trigger('click')

    expect(wrapper.emitted().search?.[0]).toEqual([''])
  })
})
