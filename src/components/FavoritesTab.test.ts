import { describe, it, test, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FavoritesTab from './FavoritesTab.vue'

describe('FavoritesTab', () => {
  const wrapper = mount(FavoritesTab, { props: { favorites: new Set([]) } })
  test('sum: adds 1 + 2 to equal 3', () => {
    // Access the Component method from the Composition API
    const instance = wrapper.vm

    // The sum function is available within the instance
    const sumFunction = (instance as any).sum

    const result = sumFunction(1, 2)

    expect(result).toBe(3)
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
