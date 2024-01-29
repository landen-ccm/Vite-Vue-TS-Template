import axios from 'axios'
import { type PokemonDetails, type PaginatedPokemon, type Pokemon } from './PokeTypes'

const detailsUrl = (id: number) => `https://pokeapi.co/api/v2/pokemon/${id}`
const listUrl = (limit = 10000, offset = 0) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

export async function getPokemon(id: number): Promise<Pokemon | null> {
  try {
    const { data: pokemon } = await axios.get<Pokemon>(detailsUrl(id))
    console.dir(pokemon)
    return pokemon
  } catch (error) {
    console.dir(error)
    return null
  }
}

export async function getPaginatedPokemon(
  count: number,
  page: number
): Promise<PaginatedPokemon | null> {
  try {
    const { data: pokemon } = await axios.get<PaginatedPokemon>(listUrl(count, page))
    console.dir(pokemon)
    return pokemon
  } catch (error) {
    return null
  }
}

export async function getAllPokemon(): Promise<PaginatedPokemon | null> {
  return await getPaginatedPokemon(100000, 0)
}

export async function detailedPage(
  page: number,
  count: number
): Promise<(PokemonDetails | null)[]> {
  const limbo: (PokemonDetails | null)[] = []
  for (let id = page * count; id < page * count + count; id++) {
    limbo.push(await getPokemonDetails(id))
  }
  Promise.allSettled(limbo) // With thoughts and prayers
  return limbo
}

export async function getPokemonDetails(id: number): Promise<PokemonDetails | null> {
  const pageInfo = await getPaginatedPokemon(1, id - 1)
  console.dir(pageInfo)

  if (pageInfo === null) {
    return null
  }

  try {
    const { data: info } = await axios.get<Pokemon>(pageInfo.results[0].url)
    if (info === null) {
      return null
    }
    const details = pageInfo as PokemonDetails
    details.details = info

    return details
  } catch (error) {
    return null
  }
}
