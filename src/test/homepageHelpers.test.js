import { beforeEach, describe, expect, test, vi, expectTypeOf } from 'vitest'
import { getData, searchButtonHandler, getDetails } from '../helpers/homepageHelpers.ts'
import { displayedPokemon } from '@/pages/variables'
import axios from 'axios'

vi.mock('axios')

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
        data: pokemonsMock
      })

      const pokemons = await getData()

      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon')
      expect(pokemons).toStrictEqual(pokemonsMock)
    })
  })

  describe('searchPokemon', () => {
    test('makes a GET request to fetch searched pokemon', async () => {
      const pokemonsMock = [
        {
          name: 'No Pokemon with this name was found',
          id: -1,
          url: 'Try Again'
        }
      ]

      axios.get.mockResolvedValue({
        data: pokemonsMock
      })

      await searchButtonHandler('bulbasaur')

      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur')
      expect.soft(displayedPokemon.value).toEqual(pokemonsMock)
    })
  })

  describe('getDetails', () => {
    test('makes a GET request to fetch searched pokemon details', async () => {
      const pokemonsMock = {
        abilities: [],
        forms: [],
        game_indices: [],
        moves: [],
        base_experience: 64,
        height: 7,
        held_items: [],
        id: 1,
        is_default: true,
        location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
        name: 'bulbasaur',
        order: 1,
        past_abilities: [],
        past_types: [],
        species: {},
        sprites: {},
        stats: [],
        types: [],
        weight: 69
      }

      axios.get.mockResolvedValue({
        data: pokemonsMock
      })

      const pokemondata = await getDetails('bulbasaur')

      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur')
      expectTypeOf(pokemondata).toEqualTypeOf(pokemonsMock)
    })
  })
})
