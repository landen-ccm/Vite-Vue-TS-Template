// import { displayData, searchResults, sortedSearch } from '@/pages/variables'
import { displayedPokemon } from '@/pages/variables'
import axios from 'axios'
const SINGLE_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'
const ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

export const getData = async (limit: string = '25', page: number = 1) => {
  try {
    if (limit != 'any') {
      const response = await axios.get(`${ALL_POKEMON_URL}/?limit=${limit}&offset=${page * +limit}`)
      return response.data
    } else {
      const response = await axios.get(`${ALL_POKEMON_URL}`)
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}

export const searchButtonHandler = async (searchParam: string) => {
  try {
    const { data } = await axios.get(`${SINGLE_POKEMON_URL}/${searchParam}`)
    const searchRes = data
    console.log(data)
    if (searchRes) {
      displayedPokemon.value = [
        {
          name: searchRes.name,
          id: searchRes.id,
          url: searchRes.sprites.front_default
        }
      ]
    }
  } catch (error) {
    alert('No pokemon found with that name. Try again!')
  }
}
