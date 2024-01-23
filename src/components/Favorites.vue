<script setup lang="ts">
// this page is a copy paste of cardlist with some filtering
import { ref } from 'vue'
import Card from './Card.vue'
import { getFavorites, setFavorites } from '../api.calls'
type PokemonData = {
  name: string
  url: string
}
type Pokemon = {
  name: string
  id: number
  isLiked: boolean
}

const props = defineProps<{
  pokemonData: Array<PokemonData>
}>()

const { pokemonData } = toRefs(props)
const favoriteAmount = getFavorites().size
const favoritePokemon = computed(() => {
  const favorites = getFavorites()
  const reformattedData = pokemonData.value.map((item) => {
    // parse url for id
    const urlParsing = item.url.split('/')
    const id = parseInt(urlParsing[urlParsing.length - 2])
    // check if it is favorited or not

    return { name: item.name, id: id, isLiked: favorites.has(id) }
  })
  return reformattedData.filter((pokemon) => pokemon.isLiked)
})

const toggleLike = (pokemon: Pokemon) => {
  pokemon.isLiked = !pokemon.isLiked
  let favoritePokemon = getFavorites()
  if (favoritePokemon.has(pokemon.id)) {
    favoritePokemon.delete(pokemon.id)
  } else {
    favoritePokemon.add(pokemon.id)
  }
  setFavorites(favoritePokemon)
}
</script>

<template>
  <div class="card-container1">
    <h1>Favorites: {{ favoriteAmount }}</h1>
    <Card
      v-for="pokemon in favoritePokemon"
      :is-liked="pokemon.isLiked"
      :key="pokemon.id"
      @likeEvent="toggleLike(pokemon)"
    >
      <template #_id>{{ pokemon.id }}</template>
      <template #name>{{ pokemon.name }}</template>
      <template #img>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
        />
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.card-container1 {
  display: flex;
  flex-wrap: wrap;
}

.p-card {
  width: 360px;
  margin: 2rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
