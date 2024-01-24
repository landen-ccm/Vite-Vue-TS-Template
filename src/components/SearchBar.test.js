import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'
import { test, expect } from 'vitest'
import { PrimeVue } from 'primevue/config'

const wrapper = mount(SearchBar, {
  global: {
    plugins: [PrimeVue]
  }
})

test('input exists on search bar', async () => {
//   const input = await wrapper.get('[data-test=input-tag]')

  const input = wrapper.get('input')
  await input.setValue('hello')

  expect(wrapper.get('input')).toEqual('hello')
  expect(input.exists()).toBe(true)

//   input.text = 'hello'
//   await wrapper.get('[data-test=input-tag]').setProps({model: 'hello'})

//   expect(wrapper.get('[data-test=input-tag]').attributes('modelvalue')).toEqual('hello')

  // expect(wrapper).toHaveProperty('model')
  // expect(input).toContain('test')
})
