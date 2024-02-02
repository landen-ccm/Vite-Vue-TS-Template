// import type{ NameUrl} from "@/composable"

export type NameAndUrl = {
  name: string
  url: string
}

export type PokemonType = {
  slot: number
  type: NameAndUrl
}

export type GameInfo = {
  game_index: number
  version: NameAndUrl
}

export type Stat = {
  base_stat: number
  effort: number
  stat: NameAndUrl
}

export const orderedSpriteKeys = [
  'front_default',
  'front_female',
  'front_shiny',
  'front_shiny_female',
  'back_default',
  'back_female',
  'back_shiny',
  'back_shiny_female'
] as const

export type DefaultSpriteKeys = (typeof orderedSpriteKeys)[number]

export type Sprites = {
  [key in DefaultSpriteKeys]: string | null
} & {
  versions: {
    'generation-v': {
      'black-white': {
        animated: {
          [key: string]: string | null
        }
      }
    }
  }
}

export type Pokemon = {
  abilities: { ability: NameAndUrl }[]
  base_experience: number
  forms: NameAndUrl[]
  game_indices: GameInfo[]
  height: number
  generation: NameAndUrl
  id: number
  is_default: boolean
  moves: { move: NameAndUrl }[]
  name: string
  order: number
  sprites: Sprites
  stats: Stat[]
  types: PokemonType[]
  weight: number
}

export type PaginatedPokemon = {
  count: number
  next: string | null
  previous: string | null
  results: NameAndUrl[]
}

export type PokemonDetails = {
  details: Pokemon
} & PaginatedPokemon
