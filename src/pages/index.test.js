import { mount } from '@vue/test-utils'
import { useToast, ToastService } from 'primevue/usetoast'
import {PrimeVue} from 'primevue/config'
import index from './index.vue'
import { test, expect } from 'vitest'

test('is a vue instance', () => {
  const wrapper = mount(index, {
    global: {
        component: { useToast },
        plugins: [PrimeVue, ToastService]
    }
  })

  const div = wrapper.find('div')
  expect(div.exists()).toBe(true)
  const ul = wrapper.find('ul')
  expect(ul.exists()).toBe(true)

  const divs = wrapper.findAllComponents('div')
  expect(divs).toHaveLength(3)

  //   const favoritesDiv = wrapper.findComponent('[test-favorites]')

  expect(wrapper.exists()).toBe(true)
})

test('favorites is invisible', () => {
  const wrapper = mount(index)

  expect(wrapper.find('#test-favorites')).isVisible().toBe(false)
})
