import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import HomePage from '../../../pages/index.vue'

describe('Home Page', () => {
  test('Mounts and contains tab list', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('ul').exists()).toBe(true)
  })
})
