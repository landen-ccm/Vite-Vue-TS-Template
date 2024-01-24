// import type{ NameUrl} from "@/composable"
export type PokemonType = {
  slot: number
  type: string
}

export type PokeAbility = {
  ability: {
    name: string
    url: string
  }
}

export type Pokemon = {
  id: number
  name: string
  abilities: PokeAbility[]
  sprites: { [key: string]: string }
  base_experience: number
  types: PokemonType[]
  height: number
  weight: number
}

export type Poke = {
  name: string
  url: string
  isFav?: boolean
}
