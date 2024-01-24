import { test, expect } from 'vitest'
import indexVue from './index.vue'
import { mount } from '@vue/test-utils'

const wrapper = mount(indexVue)

test('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  
