import { mount, shallowMount } from '@vue/test-utils'
import PokemonCard from './../components/PokemonCard.vue'
import { beforeEach, describe, test, vi, expect } from 'vitest'
import * as VueRouter from 'vue-router'
vi.mock('vue-router')
describe('PokemonCard', () => {
  VueRouter.useRouter.mockReturnValue({
    push: vi.fn()
  })

  beforeEach(() => {
    VueRouter.useRouter().push.mockReset()
  })

  test(`navigates to details route and passes param id'`, async () => {
    const wrapper = shallowMount(PokemonCard, {
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

    await wrapper.find('[data-test="detail-btn"]').trigger('click')

    expect(VueRouter.useRouter().push).toHaveBeenCalledWith({
      name: '/pokemon/[id]',
      params: { id: 1 }
    })
  })
})

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
})
