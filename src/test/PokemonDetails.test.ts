import PokemonDetails from '../pages/pokemon/[id].vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, test, vi, expect } from 'vitest'
import { useRoute, useRouter } from 'vue-router'
import * as VueRouter from 'vue-router'
import { getPokemon, api } from '../api.calls'
import axios from 'axios'

vi.mock('vue-router')
vi.mock('axios')
const useRouteSpy = vi.spyOn(VueRouter, 'useRoute')
const useRouterSpy = vi.spyOn(VueRouter, 'useRouter')

describe('PokemonDetails', () => {
  const id = '1'
  useRouter.mockReturnValue({
    push: vi.fn()
  })
  useRoute.mockReturnValue({
    params: { id: id }
  })
  beforeEach(() => {
    axios.get.mockReset()
    useRouter().push.mockReset()
  })

  const wrapper = shallowMount(PokemonDetails)
  test('The results renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('The next button increments id', () => {
    const instance = wrapper.vm
    const handleClick = (instance as any).handleClick
    const result = handleClick('Next')
    expect(result).toStrictEqual(0)
  })
  test('The prev button decrements id', () => {
    const instance = wrapper.vm
    const handleClick = (instance as any).handleClick
    const result = handleClick('Prev')
    expect(result).toStrictEqual(-1)
  })

  test('the component should be mounted', () => {
    const useRouteMock = useRouteSpy.mockImplementationOnce({ params: 'id' })
    const useRouterMock = useRouteSpy.mockImplementationOnce()
    expect(useRouteMock).toHaveBeenCalled()
    expect(useRouterMock).toHaveBeenCalled()
    expect(wrapper.exists()).toBeTruthy()
  })
})
