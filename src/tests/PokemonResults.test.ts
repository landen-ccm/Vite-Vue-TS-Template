import { mount } from '@vue/test-utils'
import PokemonResults from '../components/PokemonCard.vue'
import { assert, expect, test, vi, describe } from 'vitest'
import { bulbasaurFormatted } from './testdata'
test('page mounts', () => {
  const wrapper = mount(PokemonResults, {
    props: {
      pokemonList: [bulbasaurFormatted],
      favorites: new Set([1]),
      errorMessage: '',
      pokemon: bulbasaurFormatted,
      isFavorite: false
    }
  })
  const card = wrapper.findAll('[class="pokemon-card"]')
  expect(card).toHaveLength(1)
})
