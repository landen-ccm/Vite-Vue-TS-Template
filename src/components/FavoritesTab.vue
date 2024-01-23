<script setup lang="ts">
import { ref } from 'vue'
import { getPokemon } from '../api.calls'
import type { Pokemon } from '../api.calls'
import PokemonResults from './PokemonResults.vue'

const props = defineProps<{
  favorites: Set<number>
}>()

const favoritePokemon = ref<Pokemon[]>([])

async function populateFavorites() {
  try {
    const response = await Promise.all(
      Array.from(props.favorites).map((id) => getPokemon(id.toString()))
    )
    favoritePokemon.value = response.flatMap((poke) => poke)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await populateFavorites()
})
</script>

<template>
  <PokemonResults :pokemonList="favoritePokemon" :favorites="props.favorites" />
</template>
