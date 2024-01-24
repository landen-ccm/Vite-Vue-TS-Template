import { mount } from '@vue/test-utils'
import PokemonSearchTab from '@/components/PokemonSearchTab.vue'
import { assert, expect, test, vi, describe } from 'vitest'
import { bulbasaurFormatted } from './testdata'
test('page mounts', () => {
  const wrapper = mount(PokemonSearchTab, { props: { favorites: new Set([1]) } })
  const searchbar = wrapper.findAll('input')
  expect(searchbar).toHaveLength(1)
})
