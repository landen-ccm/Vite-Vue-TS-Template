export type PaginationSizeTypes = 25 | 50 | 100 | 'All'

export type PokemonCollectionResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
  }>
}

export type SpriteLinkType = string | null

export type SinglePokemonResponse = {
  id: number
  name: string
  sprites: {
    back_default: SpriteLinkType
    back_female: SpriteLinkType
    back_shiny: SpriteLinkType
    back_shiny_female: SpriteLinkType
    front_default: SpriteLinkType
    front_female: SpriteLinkType
    front_shiny: SpriteLinkType
    front_shiny_female: SpriteLinkType
  }
}
