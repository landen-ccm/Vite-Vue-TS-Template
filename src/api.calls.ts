import axios from 'axios'
import type {
  PaginationSizeTypes,
  PokemonCollectionResponse,
  SinglePokemonResponse
} from './models/pokedex'
const pokemonURL = `https://pokeapi.co/api/v2/pokemon`

export async function getPokemon(size: PaginationSizeTypes, page: number) {
  try {
    let reqUrl = '?'
    if (size === 'All') reqUrl = ''
    else {
      reqUrl += 'limit=' + size + '&offset=' + size * page
    }
    const result = await axios.get<PokemonCollectionResponse>(`${pokemonURL}/${reqUrl}`)
    return result
  } catch (error) {
    console.log(error)
  }
}

export async function getPokemonByNameOrId(nameOrId: string) {
  try {
    const result = await axios.get<SinglePokemonResponse>(`${pokemonURL}/${nameOrId}`)
    return result
  } catch (error) {
    console.log(error)
  }
}

export default {
  getPokemon,
  getPokemonByNameOrId
}
