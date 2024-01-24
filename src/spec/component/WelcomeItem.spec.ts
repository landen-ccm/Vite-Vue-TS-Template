import { describe } from 'node:test'
import WelcomeItemVue from '@/components/WelcomeItem.vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

describe('Welcome Item Tests', () => {
  const wrapper = mount(WelcomeItemVue, {
    slots: {
      heading: 'Meow'
    }
  })

  it('Renders basic text', () => {
    expect(wrapper.text()).toContain('Meow')
  })
})
