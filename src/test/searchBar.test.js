import { mount } from '@vue/test-utils'
import Index from '../pages/index.vue'
import { test, expect } from 'vitest'

test('sets the value', async () => {
  const wrapper = mount(Index)
  const input = wrapper.get('input')

  await input.setValue('caterpie')

  expect(input.element.value).toBe('caterpie')
})
