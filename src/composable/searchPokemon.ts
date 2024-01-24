import axios from 'axios'
import type { Pokemon } from '@/helpers/PokeTypes'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function searchPokemon(name: string): Promise<Pokemon | null> {
  if (!name.length) {
    return null
  }
  try {
    const { data: data } = await axios.get<Pokemon>(`${BASE_URL}${name}`)
    console.log('searchPokemon')
    console.log(data)
    return data
  } catch (error) {
    // error: Error
    console.log(error)
  }
  {
    return null
  }
}
