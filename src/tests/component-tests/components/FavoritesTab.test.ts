import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FavoritesTab from '../../../components/FavoritesTab.vue'

describe('Favorites Tab Component', () => {
  test('Clear all button hidden for no favorites', () => {
    const wrapper = mount(FavoritesTab, {
      props: {
        favorites: new Set()
      }
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
