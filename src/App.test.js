import { mount } from '@vue/test-utils'
import App from './App.vue'
import { test, expect } from 'vitest'

const wrapper = mount(App)

test('is a vue instance', () => {
  expect(wrapper.exists()).toBeTruthy()
})
