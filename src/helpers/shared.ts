export type PokeCard = {
  name: string
  id: number
  imageUrl: string
}

export type PokemonInfo = {
  name: string
  sprites: { [key: string]: string }
  id: number
}
