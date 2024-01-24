import { mount } from '@vue/test-utils'
import PokemonCard from './PokemonCard.vue'
import { beforeEach, describe, test, vi, expect } from 'vitest'
import { useRouter } from 'vue-router'
const pokemonDetailName = '/pokemon/[id]'

describe('PokemonCard', () => {
  const wrapper = mount(PokemonCard, {
    props: {
      pokemon: {
        name: 'bulbasaur',
        id: 1,
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
      },
      isFavorite: false
    }
  })

  test('pokemon id and name is correct', () => {
    const pokemonNameId = wrapper.get('[data-test="pokemon-name"]')
    expect(pokemonNameId.text()).toBe('#1 - BULBASAUR')
  })

  // vi.mock('vue-router')
  // useRouter.mockReturnValue({
  //   push: vi.fn()
  // })

  // beforeEach(() => {
  //   useRouter().push.mockReset()
  // })

  // test(`navigates to details route`, async () => {
  //   const wrapper = mount(PokemonCard)

  //   await wrapper.find('Button').trigger('click')

  //   expect(useRouter().push).toHaveBeenCalledWith({ name: pokemonDetailName, params: { id: 1 } })
  // })
})
