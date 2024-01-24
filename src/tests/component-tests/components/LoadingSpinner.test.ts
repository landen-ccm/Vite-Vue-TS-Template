import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LoadingSpinner from '../../../components/LoadingSpinner.vue'

describe('Loading Spinner Component', () => {
  test('Mounts with default text', () => {
    const wrapper = mount(LoadingSpinner)

    const message = wrapper.get('[data-test="text"]')

    expect(message.text()).toBe('Loading')
  })
  test('Empty message from props hides text span', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        text: ''
      }
    })
    expect(wrapper.find('span').exists()).toBe(false)
  })
})
