import axios from 'axios'
import { type PokemonData } from '@/models'

const getPokemon = async (id: string) => {
    const { data } = await axios.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(data)
    return data
  }

  export default { getPokemon}