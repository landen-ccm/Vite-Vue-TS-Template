import { describe, it, test, expect, vi, beforeEach } from 'vitest'

import axios from 'axios'

import { mount } from '@vue/test-utils'
import FavoritesTab from '../components/FavoritesTab.vue'

describe('FavoritesTab', () => {
  const wrapper = mount(FavoritesTab, { props: { favorites: new Set([]) } })
  test('The favorites page renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('The populateFavorites function is called', async () => {
    const instance = wrapper.vm
    const populateFavorites = (instance as any).populateFavorites
    const result = populateFavorites()
    expect(result).toStrictEqual(new Promise<void>((resolve, reject) => {}))
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
