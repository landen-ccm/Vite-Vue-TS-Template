import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PokemonCard from '../../../components/PokemonCard.vue'

describe('Pokemon Card Component', () => {
  test('Displays id - name header', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: { name: 'charizard', id: 6 },
        isFavorite: true
      }
    })

    const headerTag = wrapper.get('[data-test="header"]')
    expect(headerTag.text()).toBe('#6 - CHARIZARD')
  })
})
