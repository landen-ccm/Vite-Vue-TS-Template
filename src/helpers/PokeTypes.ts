export type PokemonType = {
  slot: number
  type: NameUrl
}

export type Pokemon = {
  id: number
  name: string
  sprites: { [key: string]: string }
  base_experience: number
  types: PokemonType[]
  height: number
  weight: number
}
