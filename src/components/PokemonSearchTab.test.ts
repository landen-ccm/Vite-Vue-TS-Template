import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonSearchTab from './PokemonSearchTab.vue'

describe('PokemonSearchTab', () => {
  const wrapper = mount(PokemonSearchTab, {
    props: {
      favorites: new Set([])
    }
  })

  test('sum: adds 1 + 2 to equal 3', () => {
    // Access the Component method from the Composition API
    const instance = wrapper.vm

    // The sum function is available within the instance
    const sumFunction = (instance as any).sum

    const result = sumFunction(1, 2)

    expect(result).toBe(3)
  })
})
