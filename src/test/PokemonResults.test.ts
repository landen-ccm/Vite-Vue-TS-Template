import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PokemonResults from './../components/PokemonResults.vue'

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
  test('The results renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
