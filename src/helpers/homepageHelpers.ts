import { displayedPokemon } from '@/pages/variables'
import axios from 'axios'
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

export const getData = async (limit: string = '25', page: number = 1) => {
  try {
    if (limit != 'any') {
      const response = await axios.get(`${POKEMON_URL}/?limit=${limit}&offset=${page * +limit}`)
      return response.data
    } else {
      const response = await axios.get(`${POKEMON_URL}`)
      return response.data
    }
  } catch (error) {
    alert('No pokemon were found')
    console.error(error)
  }
}

export const searchButtonHandler = async (searchParam: string) => {
  try {
    const { data } = await axios.get(`${POKEMON_URL}/${searchParam}`)
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
