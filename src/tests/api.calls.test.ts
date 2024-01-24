import { assert, expect, test, vi, describe } from 'vitest'

import { getPokemon, getPokemonList, getFavorites, setFavorites } from '../api.calls'
import axios from 'axios'
import { bulbasaurRaw, bulbasaurFormatted, pokemonBatch, pokemonBatchFormatted } from './testdata'
// vi.mock('axios', () => ({
//   default: { get: vi.fn() }
// }))
vi.mock('axios')

// vi.mocked(axios,true)
describe('getPokemon', () => {
  describe('Get an Invalid Pokemon', () => {
    test('make an invalid GET async Request', async () => {
      vi.mocked(axios, true).get.mockRejectedValueOnce(new Error('api did an oopsie'))
      const result = await getPokemon('fff')
      expect(result).toEqual([])
    })
  })

  describe('Get a valid Pokemon', () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(bulbasaurRaw)
    test('make a valid GET async Request', async () => {
      const result = await getPokemon('1')
      expect(result).toEqual(bulbasaurFormatted)
    })
  })

  describe('Get multiple Pokemon', () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(pokemonBatch)
    test('make a valid batch get request', async () => {
      const result = await getPokemonList(25, 1)
      expect(result).toEqual(pokemonBatchFormatted)
    })
  })
})
