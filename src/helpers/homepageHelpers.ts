import axios from 'axios'
const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon-species'
const ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

export const getData = async (limit: string) => {
  try {
    if (limit != 'any') {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=${limit}`)
      return response.data
    }
    // else {
    //   const response = await axios.get(`${ALL_POKEMON_URL}`)
    //   return response.data
    // }
  } catch (error) {
    console.error(error)
  }
}

export const searchButtonHandler = async (searchParam: string) => {
  const response = await axios.get(`${SINGLE_POKEMON_URL}/${searchParam}`)
  const searchRes = response.data
  console.log(searchRes)
}
