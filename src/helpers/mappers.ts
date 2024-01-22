export const mapFromBulkSearch(bulkArray) = {
    return bulkArray.map((pokemon) => {
    return {
      name: pokemon.name,
      id: pokemon.url.split('pokemon/')[1].slice(0, -1),
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('pokemon/')[1].slice(0, -1)}.png`
    }
  }
