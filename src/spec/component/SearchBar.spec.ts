import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SearchBarVue from '@/components/SearchBar.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

describe('Searchbar tests', () => {
  const testValue = 'arcanine'

  const wrapper = mount(SearchBarVue)

  const input = wrapper.find('input')
  input.setValue(testValue)

  const button = wrapper.find('button')

  const arcanineData = {
    id: 59,
    name: 'arcanine'
  }

  vi.mock('axios')

  it('Emits an event on button press', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: arcanineData })
    await button.trigger('click')
    await flushPromises()
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('Emits an event on button press', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: arcanineData })
    await input.trigger('keyboard.click')
    await flushPromises()
    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})
