import { useRouter } from 'vue-router'
import { searchPokemon } from './searchPokemon'
import {getallpokemon } from './searchAllPokemon.ts'
import { test, expect, expectTypeOf, describe, vi, beforeEach } from 'vitest'
import axios from 'axios'
import {} from 'vue'

vi.mock('axios')

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

describe('API calls', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  describe('fetch one pokemon', () => {
    test('makes a GET request to pikachu', async () => {
      const pokemon = 'pikachu'
      const expectedURL = `${BASE_URL}pikachu`

      axios.get.mockResolvedValue( {
        "base_experience": 112,
      })

      expect(searchPokemon(pokemon)).toBeCalledWith(expectedURL)
    })
  })

  expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon')

  test('my pokemon api calls work properly', () => {
    expectTypeOf(searchPokemon('erojre')).toEqualTypeOf(Promise)
  })
})

describe('Pokemon Service', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  describe('fetchPokemon', () => {
    test('makes a GET request to fetch pokemon', async () => {
      const pokemonsMock = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
      ]

      axios.get.mockResolvedValue({
        data: {count: 1302}
      })

      const pokemons = await getallpokemon()

      expect(pokemons).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=1302')
    //   expect(pokemons).toStrictEqual(pokemonsMock)
    //   expect(axios.get(null)).toEqual(Promise {null})
    })
  })
})
