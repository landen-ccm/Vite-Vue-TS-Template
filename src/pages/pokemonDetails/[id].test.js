import { mount } from '@vue/test-utils'
import idVue from './[id].vue'
import { test, expect } from 'vitest'

test('is a vue instance', () => {
  const wrapper = mount(idVue)

  expect(wrapper.exists()).toBe(true)
})
