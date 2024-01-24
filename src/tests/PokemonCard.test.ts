import { mount } from '@vue/test-utils'
import PokemonCard from '../components/PokemonCard.vue'
import { assert, expect, test, vi, describe } from 'vitest'
import { bulbasaurFormatted } from './testdata'
test('page mounts', () => {
  const wrapper = mount(PokemonCard, { props: { pokemon: bulbasaurFormatted, isFavorite: false } })
  const card = wrapper.get('[class="pokemon-card"]')
})
