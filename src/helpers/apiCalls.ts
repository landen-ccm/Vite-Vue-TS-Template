import axios from 'axios'

export const searchByName = async (name: string) => {
  if (name.trim().length <= 0) {
    return null
  }
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    console.log(data)
    return data
  } catch (error) {
    return null
  }
}

export type PokeList = {
  count: number
  next: string
  previous: string
  results: PokeListElement[]
}

export type PokeListElement = {
  name: string
  url: string
}

export const getListOfPokemon = async (count: number, page = 0): Promise<PokeList | null> => {
  try {
    const { data } = await axios.get<PokeList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${page}`
    )
    return data
  } catch (error) {
    return null
  }
}
