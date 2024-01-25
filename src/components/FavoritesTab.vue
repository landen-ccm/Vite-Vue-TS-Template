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
  const response = await Promise.all(
    Array.from(props.favorites).map((id) => getPokemon(id.toString()))
  )
  favoritePokemon.value = response.flatMap((poke) => poke).sort((a, b) => a.id - b.id)
}

onMounted(async () => {
  await populateFavorites()
})
</script>

<template>
  <PokemonResults
    :pokemonList="favoritePokemon"
    :favorites="props.favorites"
    :errorMessage="'No favorited Pokemon yet'"
  />
  <Button v-if="favorites.size > 0" @click="clearFavorites">Clear All</Button>
</template>
