import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PokemonSearchTab from '../../../components/PokemonSearchTab.vue'

describe('Pokemon Search Tab Component', () => {
  test('Loading by default on mount', () => {
    const wrapper = mount(PokemonSearchTab, {
      props: {
        favorites: new Set()
      }
    })
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
  })
})
