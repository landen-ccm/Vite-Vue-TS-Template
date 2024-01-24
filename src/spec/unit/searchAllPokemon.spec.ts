import { getallpokemon } from '@/composable/searchAllPokemon'
import axios from 'axios'
import { describe, expect, it, vi } from 'vitest'

const pokeList = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/'
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/'
  }
]

const pokeGet = {
  count: 3,
  results: pokeList
}

vi.mock('axios')

describe('Test getting a list of Pokemon', () => {
  it('Correctly fetches the list of Pokemon', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: pokeGet })
    const pokes = await getallpokemon()
    expect(pokes).toEqual(pokeList)
  })

  it('Returns null upon failure', async () => {
    vi.mocked(axios, true).get.mockRejectedValue(null)
    const pokes = await getallpokemon()
    expect(pokes).toEqual(null)
  })
})
