import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PokemonResults from '../../../components/PokemonResults.vue'

describe('Pokemon Results Component', () => {
  test('Error message displays for empty results', () => {
    const wrapper = mount(PokemonResults, {
      props: {
        pokemonList: [],
        favorites: new Set()
      }
    })

    const errorTag = wrapper.find('.error')
    expect(errorTag.text()).toBe('No Pokemon found')
  })
})
