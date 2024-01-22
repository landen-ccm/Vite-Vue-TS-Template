import axios from 'axios'
import { useRequest } from './useRequest'
import type { Pokemon } from '@/helpers/PokeTypes'

type NameUrl = { name: string; url: string }

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'


export async function searchPokemon(name: string): Promise<Pokemon | null> {
  if (!name.length) {
    return null
  }
  try {
    const { data: data } = await axios.get<Pokemon>(`${BASE_URL}${name}`)
    return data
  } catch(error) {
    // error: Error
    console.log(error)
  }
  {
    return null
  }
}
