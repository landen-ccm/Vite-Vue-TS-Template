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
  type: {
    name: string
    url: string
  }
}

export type PokeAbility = {
  ability: { name: string; url: string }
}

export type DetailedPokemon = {
  name: string
  id: number
  types: PokeType[]
  abilities: PokeAbility[]
  sprites: {
    [key: string]: string | null
  }
}
