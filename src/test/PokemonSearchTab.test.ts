import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonSearchTab from './../components/PokemonSearchTab.vue'

describe('PokemonSearchTab', () => {
  const wrapper = mount(PokemonSearchTab, {
    props: {
      favorites: new Set([])
    }
  })

  test('The search page renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
