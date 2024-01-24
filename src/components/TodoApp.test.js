import { mount } from '@vue/test-utils'
import TodoApp from './TodoApp.vue'
import {test, expect} from 'vitest'

test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toBe('Learn Vue.js 3')
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)
})