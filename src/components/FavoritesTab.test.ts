import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FavoritesTab from './FavoritesTab.vue'

describe('FavoritesTab', () => {
  const wrapper = mount(FavoritesTab, { props: { favorites: new Set([]) } })
  test('The favorites page renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // test('populate ', () => {
  //   // Access the Component method from the Composition API
  //   const instance = wrapper.vm

  //   // The sum function is available within the instance
  //   const populateFunction = (instance as any).populateFavorites

  //   const result = populateFunction()

  //   expect(result).toBe(3)
  // })
})
