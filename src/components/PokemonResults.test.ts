import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonResults from './PokemonResults.vue'

describe('PokemonResults', () => {
  const wrapper = mount(PokemonResults, {
    props: {
      pokemonList: [
        {
          name: '',
          id: 0,
          sprites: {
            front_default: '',
            front_shiny: '',
            front_female: '',
            front_shiny_female: '',
            back_default: '',
            back_shiny: '',
            back_female: '',
            back_shiny_female: ''
          }
        }
      ],
      favorites: new Set([]),
      errorMessage: 'error'
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
