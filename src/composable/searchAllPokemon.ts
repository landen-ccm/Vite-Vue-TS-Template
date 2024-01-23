import axios from 'axios'
import type { Poke } from '@/helpers/PokeTypes'
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function getallpokemon(): Promise<Poke[] | null> {
  try {
    const { data } = await axios.get<{ results: Poke[] }>(`${BASE_URL}?limit=1302`)
    console.log('getallpokemon', data)
    return data.results
  } catch (error) {
    console.log(error)
  }
  {
    return null
  }
}
