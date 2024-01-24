import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  API_URL,
  FAVORITES_KEY,
  getFavorites,
  getPokemon,
  getPokemonList,
  setFavorites
} from '@/api.calls'
import axios from 'axios'

vi.mock('axios')

describe('API Calls', () => {
  describe('getPokemon', () => {
    const pokemonMock = {
      name: 'bulbasaur',
      id: 1,
      sprites: { front_default: null },
      abilities: [],
      types: []
    }

    test('Make a GET request for an existing pokemon', async () => {
      vi.mocked(axios.get).mockResolvedValue({
        data: pokemonMock
      })

      const pokemonResult = await getPokemon(pokemonMock.name)

      expect(axios.get).toHaveBeenCalledWith(API_URL + pokemonMock.name)
      expect(pokemonResult).toStrictEqual([pokemonMock])
    })
    test('Make a GET request for an nonexistent pokemon', async () => {
      const searchName = 'fake'

      vi.mocked(axios.get).mockRejectedValue(new Error('Not Found'))

      const pokemonResult = await getPokemon(searchName)

      expect(axios.get).toHaveBeenCalledWith(API_URL + searchName)
      expect(pokemonResult).toStrictEqual([])
    })
  })

  describe('getPokemonList', () => {
    test('Make a GET request for a page size and page number', async () => {
      const pageSize = 2
      const pageNumber = 1
      const offset = 0
      const mockedResult = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]
      const expectedResult = [
        { name: 'bulbasaur', id: 1 },
        { name: 'ivysaur', id: 2 }
      ]

      vi.mocked(axios.get).mockResolvedValue({
        data: {
          results: mockedResult
        }
      })

      const pokemonResult = await getPokemonList(pageSize, pageNumber)

      const apiQuery = '?limit=' + pageSize + '&offset=' + offset
      expect(axios.get).toHaveBeenCalledWith(API_URL + apiQuery)
      expect(pokemonResult).toStrictEqual(expectedResult)
    })
    test('Make a GET request for an invalid page size and number', async () => {
      const pageSize = 0
      const pageNumber = 0
      const offset = 0

      vi.mocked(axios.get).mockRejectedValue(new Error('Invalid'))

      const pokemonResult = await getPokemonList(pageSize, pageNumber)

      const apiQuery = '?limit=' + pageSize + '&offset=' + offset
      expect(axios.get).toHaveBeenCalledWith(API_URL + apiQuery)
      expect(pokemonResult).toStrictEqual([])
    })
  })

  describe('getFavorites', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')

    afterEach(() => {
      localStorage.clear()
    })

    test('Get existing favorites from localstorage', () => {
      const favorites = new Set([1, 2, 3])

      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]))

      const result = getFavorites()

      expect(result).toStrictEqual(favorites)
      expect(getItemSpy).toHaveBeenCalledWith(FAVORITES_KEY)
    })
    test('Get empty favorites from localstorage', () => {
      const favorites = new Set([])
      const result = getFavorites()
      expect(result).toStrictEqual(favorites)
    })
  })

  describe('setFavorites', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    afterEach(() => {
      localStorage.clear()
    })

    test('Set favorites to localStorage', () => {
      const favorites = new Set([1, 2, 3])
      setFavorites(favorites)
      expect(getFavorites()).toStrictEqual(favorites)
      expect(setItemSpy).toHaveBeenCalledWith(FAVORITES_KEY, JSON.stringify([...favorites]))
    })
  })
})
