<script setup lang="ts">
import { ref } from 'vue'
import { getPokemon } from '../api.calls'
import type { Pokemon } from '../api.calls'
import PokemonResults from './PokemonResults.vue'
import Button from 'primevue/button'

const props = defineProps<{
  favorites: Set<number>
}>()

const clearFavorites = inject<() => void>('clearFavorites', () => {})

const favoritePokemon = ref<Pokemon[]>([])

async function populateFavorites() {
  try {
    const response = await Promise.all(
      Array.from(props.favorites).map((id) => getPokemon(id.toString()))
    )
    favoritePokemon.value = response.flatMap((poke) => poke).sort((a, b) => a.id - b.id)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await populateFavorites()
})
</script>

<template>
  <div>
    <PokemonResults
      class="pokemon-results"
      :pokemonList="favoritePokemon"
      :favorites="props.favorites"
      :errorMessage="'No favorited Pokemon yet'"
    />
    <Button v-if="favorites.size > 0" @click="clearFavorites">Clear All</Button>
  </div>
</template>
