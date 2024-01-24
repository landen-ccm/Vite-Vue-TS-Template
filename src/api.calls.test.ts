import { getPokemon, api, getPokemonList, getFavorites, setFavorites } from './api.calls'
import { afterEach, beforeEach, describe, expect, vi, test } from 'vitest'
import axios from 'axios'

const FAV_KEY = 'pokemonFavorites'

vi.mock('axios')
describe('API calls', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })
  describe('getPokemon', () => {
    test('makes a GET request to fetch pokemon', async () => {
      const pokemonMock = {
        name: 'Bulbasaur',
        id: 1,
        sprites: { front_default: null },
        abilities: {},
        types: {}
      }
      axios.get.mockResolvedValue({ data: pokemonMock })
      const pokemon = await getPokemon('1')
      expect(axios.get).toHaveBeenCalledWith(api + '1')
      expect(pokemon).toStrictEqual([pokemonMock])
    })

    test('makes a GET request with invalid name/id', async () => {
      axios.get.mockResolvedValue([])
      const pokemon = await getPokemon('fake')
      expect(axios.get).toHaveBeenCalledWith(api + 'fake')
      expect(pokemon).toStrictEqual([])
    })
  })
  // describe('getPokemonList', () => {
  //   test('makes a GET request to fetch pokemon', async () => {

  //   })
  // })
})

describe('Local Storage Calls', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })
  describe('getFavorites', () => {
    test('gets favorites array from localStorage', () => {
      const favArr: number[] = [1, 2]
      localStorage.setItem(FAV_KEY, JSON.stringify(favArr))
      expect(getFavorites()).toStrictEqual(new Set([1, 2]))
      expect(getItemSpy).toHaveBeenCalledWith(FAV_KEY)
    })
    test('gets favorites array from localStorage favorites is null', () => {
      expect(getFavorites()).toStrictEqual(new Set([]))
      expect(getItemSpy).toHaveBeenCalledWith(FAV_KEY)
    })
  })
  describe('setFavorites', () => {
    test('sets favorites array to localStorage', () => {
      const favArr: number[] = [1, 2]
      setFavorites(new Set(favArr))
      expect(setItemSpy).toHaveBeenCalledWith(FAV_KEY, JSON.stringify(favArr))
      expect(getFavorites()).toStrictEqual(new Set(favArr))
    })
  })
})
