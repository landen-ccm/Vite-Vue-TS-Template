import { shallowMount } from '@vue/test-utils'
import PokeCard from '../components/PokeCard.vue'
import { test, expectTypeOf } from 'vitest'
import { useToast } from 'primevue/usetoast'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

test('renders a pokeCard', () => {
  const wrapper = shallowMount(PokeCard, {
    props: { name: 'bulbasaur', id: 1, url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    global: {
      components: { useToast },
      plugins: [PrimeVue, ToastService]
    }
  })

  const pokemonName = wrapper.get('[data-test="todo"]')

  expectTypeOf(pokemonName.text()).toEqualTypeOf('bulbasaur')
})
