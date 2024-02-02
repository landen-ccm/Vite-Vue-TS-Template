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

export async function detailedPage(page: number, count: number): Promise<(Pokemon | null)[]> {
  const limbo: (Pokemon | null)[] = []
  const pageInfo = await getAllPokemon()
  for (let id = page * count; id < page * count + count; id++) {
    limbo.push(await getPokemonDetails(id, pageInfo))
  }
  Promise.allSettled(limbo) // With thoughts and prayers
  return limbo
}

export async function getPokemonDetails(
  id: number,
  pageInfo: PaginatedPokemon | null
): Promise<Pokemon | null> {
  let url = ''
  if (pageInfo === null) {
    pageInfo = await getPaginatedPokemon(1, id - 1)
    if (pageInfo === null) {
      return null
    }
    url = pageInfo.results[0].url
  } else {
    console.dir(pageInfo.results[id])
    url = pageInfo.results[id].url
  }
  console.dir(url)

  try {
    const { data: info } = await axios.get<Pokemon>(url)
    if (info === null) {
      return null
    }

    return info
  } catch (error) {
    return null
  }
}
