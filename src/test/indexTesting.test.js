import { mount } from '@vue/test-utils'
import PokeCard from '../components/PokeCard.vue'
import { test, expect } from 'vitest'
import { useToast } from 'primevue/usetoast'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

test('renders a pokeCard', async () => {
  const wrapper = mount(PokeCard, {
    props: { name: 'bulbasaur', id: 1, url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    global: {
      components: { useToast },
      plugins: [PrimeVue, ToastService]
    }
  })

  const pokemonName = wrapper.get('[data-test="pokeName"]')

  expect(pokemonName.text()).toEqual('BulbasaurView details')
})
