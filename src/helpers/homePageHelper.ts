import axios from 'axios'
const ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'
// const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon-species'

type input = { limit?: string; name?: string }

export const fetchAllPokemon = async (param: input) => {
  try {
    if (param.name) {
      const response = await axios.get(`${ALL_POKEMON_URL}/${param.name}`)
      return [{ name: response.data.name, url: `${ALL_POKEMON_URL}/${response.data.id}` }]
    } else if (param.limit === 'any') {
      const response = await axios.get(`${ALL_POKEMON_URL}`)
      const data = await response.data.results
      return data
    } else {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=${param.limit}`)
      const data = await response.data.results
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

// export const fetchOnePokemon = async (name: string) => {
//   try {
//     const response = await axios.get(`${SINGLE_POKEMON_URL}/${name}`)
//     return response.data
//   } catch (error) {
//     throw new Error('No data found')
//   }
// }
