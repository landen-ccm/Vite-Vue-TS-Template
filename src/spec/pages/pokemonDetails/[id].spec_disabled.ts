import { describe, expect, it, vi } from 'vitest'
import IdVue from '@/pages/pokemonDetails/[id].vue'
import { mount } from '@vue/test-utils'
import router from '@/router'

const mockRoute = {
  query: {
    pokemon: 69
  }
}

describe('Test Pokemon Details', () => {
  it("It should show the pokemon's name", async () => {
    router.push({
      path: 'pokemonDetails',
      query: {
        id: 59
      }
    })
    const wrapper = mount(IdVue)
    expect(wrapper.text).contains('arcanine')
  })
})
