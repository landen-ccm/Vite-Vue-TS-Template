import axios from 'axios'
const ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'
// const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon-species'

type input = { limit?: string; name?: string, page?: number }

export const fetchAllPokemon = async (param: input) => {
  try {
    if (param.name) {
      const response = await axios.get(`${ALL_POKEMON_URL}/${param.name}`)
      return [{ name: response.data.name, url: `${ALL_POKEMON_URL}/${response.data.id}` }]
    } else if (param.limit === 'all') {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=1302`)
      const data = await response.data
      return data
    } else if (param.page === 0 && param.limit) {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=${param.limit}&offset=${+param.limit*param.page}`)
      const data = await response.data
      return data
    } else if (param.limit && param.page) {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=${param.limit}&offset=${+param.limit*param.page}`)
      // console.log('paginated response', response)
      const data = await response.data
      // console.log('paginated data response', data);
      return data
    }
  } catch (error) {
    alert('No pokemon found')
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
