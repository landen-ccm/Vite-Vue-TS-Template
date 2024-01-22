import axios from 'axios'
const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`


export default async function getPokemon(query: string) {
    try {
        const result = await axios
          .get(pokemonURL + query)
        return result
    } catch (error) {
        console.log(error)
    }
    //   .then((result) => {
    //     return result
    //   })
    //   .catch((error) => {
    //     throw new Error(error)
    //   })

    // return result
  }