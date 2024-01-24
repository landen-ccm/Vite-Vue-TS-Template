import { mount } from '@vue/test-utils'
import LoadingSpinner from './LoadingSpinner.vue'
import {test, expect} from 'vitest'

test('renders span with props', async () => {
    const wrapper = mount(LoadingSpinner)
    wrapper.setProps({text: 'hello'})

    await wrapper.get('[data-test="todo-span"]')

    expect(wrapper.findAll('[data-test="todo-span"]')).toHaveLength(1)
})