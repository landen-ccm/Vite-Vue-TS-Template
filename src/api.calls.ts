import axios from 'axios'

type SpriteType = string | null

export type Pokemon = {
  name: string
  id: number
  sprites: {
    front_default: SpriteType
    front_shiny: SpriteType
    front_female: SpriteType
    front_shiny_female: SpriteType
    back_default: SpriteType
    back_shiny: SpriteType
    back_female: SpriteType
    back_shiny_female: SpriteType
  }
}
type PokemonBatchResponse = {
  name: string
  url: string
}
const api = 'https://pokeapi.co/api/v2/pokemon/'
const imageapi = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

// search for a get a single pokemon
export async function getPokemon(searchQuery: string): Promise<Pokemon[]> {
  try {
    const res = await axios.get(api + searchQuery)
    const pokemon = { name: res.data.name, id: res.data.id, sprites: res.data.sprites }
    return [pokemon]
  } catch {
    return []
  }
}
// returns a list of pokemon
export async function getPokemonList(size: number, page: number): Promise<Pokemon[]> {
  try {
    const paginationQuery = '?limit=' + size + '&offset=' + (page - 1) * size
    const res = await axios.get(api + paginationQuery)
    return res.data.results.map((item: PokemonBatchResponse) => {
      const splitUrl = item.url.split('/')
      return { name: item.name, id: parseInt(splitUrl[splitUrl.length - 2]) }
    })
  } catch {
    return []
  }
}
