import { describe, expect, it } from 'vitest'
import indexVue from '@/pages/index.vue'
import { config, flushPromises, mount } from '@vue/test-utils'
import ToastService from 'primevue/toastservice'

describe('Homepage Tests', () => {
  it('Should fetch and render a list of Pokemon', async () => {
    const wrapper = mount(indexVue, {
      global: {
        plugins: [ToastService]
      }
    })
    await flushPromises()
    expect(wrapper.text()).toContain('favorites')
  })
})
