import axios from 'axios'

export type Pokemon = {
    name: string,
    id: number
}
const api = 'https://pokeapi.co/api/v2/pokemon/'
const imageapi = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

// search for a get a single pokemon
export async function getPokemon(searchQuery: string) : Promise<Pokemon[]> {
    try {
        const res = await axios.get(api + searchQuery)
        console.log(res)
        const pokemon = {name: res.data.name, id:res.data.id}
        return [pokemon]
    } catch {
        throw new Error('Pokemon not found')
    }

  }
// returns a list of pokemon
export  async function getPokemonList() : Promise<Pokemon[]>{
    try {
        const res = await axios.get(api)
        console.log(res)
        return res.data.results.map((item: Pokemon, index: number) => {return {name: item.name, id:index+1}})
    } catch {
        throw new Error('Error retieving pokemon')
    }

}