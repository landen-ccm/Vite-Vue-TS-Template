import axios from 'axios'
import type { Poke } from '@/helpers/PokeTypes'
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function getallpokemon(): Promise<Poke[] | null>  {
    try {
      const { data} = await axios.get<{results: Poke[]}>(`${BASE_URL}`)
      console.log('getallpokemon',data.results)
      return data.results;
      console.log(data.results)
    } catch(error) {
      console.log(error)
    }
    {
      return null
    }
  }
  async function fetchData() {
    const allPokemon = await getallpokemon();
  
    if (allPokemon) {
      console.log('All Pokemon data:', allPokemon);
    } else {
      console.log('An error occurred while fetching Pokémon data.');
    }
  }
  
  export default fetchData();