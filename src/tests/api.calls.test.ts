import { assert, expect, test, vi, describe } from 'vitest'

import { getPokemon, getPokemonList, getFavorites, setFavorites } from '../api.calls'
import axios from 'axios'
import { bulbasaurRaw, bulbasaurFormatted } from './testdata'
vi.mock('axios')

describe('getPokemon', () => {
  describe('Get an Invalid Pokemon', () => {
    test('make an invalid GET async Request', async () => {
      axios.get.mockRejectedValueOnce(new Error('api did an oopsie'))
      const result = await getPokemon('fff')
      expect(result).toEqual([])
    })
  })
  describe('Get a valid Pokemon', () => {
    vi.mock('axios')
    axios.get.mockResolvedValueOnce(bulbasaurRaw)
    test('make a valid GET async Request', async () => {
      const result = await getPokemon('1')
      expect(result).toEqual(bulbasaurFormatted)
    })
  })
})
