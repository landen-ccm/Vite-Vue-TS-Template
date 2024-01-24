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

type PokemonType = {
  slot: number
  type: {
    name: string
  }
}

type PokemonAbility = {
  ability: { name: string }
  slot: number
}

export type EnhancedPokemon = Pokemon & { abilities: PokemonAbility[]; types: PokemonType[] }

type PokemonBatchResponse = {
  name: string
  url: string
}
export const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
export const FAVORITES_KEY = 'pokemonFavorites'

// search for a get a single pokemon
export async function getPokemon(searchQuery: string): Promise<Pokemon[]> {
  try {
    const res = await axios.get(API_URL + searchQuery)
    const pokemon = {
      name: res.data.name,
      id: res.data.id,
      sprites: res.data.sprites,
      abilities: res.data.abilities,
      types: res.data.types
    }
    return [pokemon]
  } catch {
    return []
  }
}
// returns a list of pokemon
export async function getPokemonList(size: number, page: number): Promise<Pokemon[]> {
  try {
    const paginationQuery = '?limit=' + size + '&offset=' + (page - 1) * size
    const res = await axios.get(API_URL + paginationQuery)
    return res.data.results.map((item: PokemonBatchResponse) => {
      const splitUrl = item.url.split('/')
      return { name: item.name, id: parseInt(splitUrl[splitUrl.length - 2]) }
    })
  } catch {
    return []
  }
}
export const getFavorites = (): Set<number> => {
  const favorites = localStorage.getItem(FAVORITES_KEY)
  if (favorites === null) {
    return new Set([])
  } else {
    return new Set([...JSON.parse(favorites)])
  }
}

export const setFavorites = (pokemonFavorites: Set<number>) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...pokemonFavorites]))
}
