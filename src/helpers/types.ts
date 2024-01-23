export type displaydata = {
  count?: number
  next?: string
  previous?: string
  results: {
    name: string
    url: string
    id?: string
  }[]
}

export type Pokemon = {
  name: string
  id: number
  url: string
}

export type Favorites = { [key: number]: Pokemon | null }

export type PokeType = {
  name: string
  url: string
}

export type DetailedPokemon = {
  name: string
  id: number
  types: PokeType[]
  weight: number
  height: number
  sprites: {
    [key: string]: string | null
  }
}
