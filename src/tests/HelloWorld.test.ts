import { mount } from '@vue/test-utils'
import { assert, expect, test, vi, describe } from 'vitest'
import HelloWorld from '@/components/HelloWorld.vue'

test('page mounts', () => {
  const wrapper = mount(HelloWorld, { props: { msg: 'string' } })
  const greeting = wrapper.get('[class="check"]')
  expect(wrapper.html()).toContain('hello')
})
