import axios from 'axios'

export const getEnhancedPokemon = async (id: string) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    data.url = data.species.url
    return [data]
  }
  
export const getPokemon = async (selectedPagination:string, pageNumber:number) => {
    let pagination = 25
    if (selectedPagination === 'All') {
        pagination = 1302
    } else {
        pagination = parseInt(selectedPagination)
    }
    const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pagination}&offset=${(pageNumber.value - 1) * pagination}`
    )
    return data
}

export const getFavorites = (): Set<number> => {
    const favorites = localStorage.getItem('pokemonFavorites')
    if (favorites === null) {
      return new Set([])
    } else {
      return new Set([...JSON.parse(favorites)])
    }
  }

export const setFavorites = (pokemonFavorites: Set<number>) => {
    localStorage.setItem('pokemonFavorites', JSON.stringify([...pokemonFavorites]))
  }