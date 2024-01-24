import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PokemonIdPage from '../../../pages/pokemon/[id].vue'

describe('Pokemon by ID Page', () => {
  test("Doesn't render container if a pokemon is not set", () => {
    const wrapper = mount(PokemonIdPage)
    expect(wrapper.find('.container').exists()).toBe(false)
  })
})
