<script setup lang="ts">
import type { Pokemon } from '../api.calls'

const props = withDefaults(
  defineProps<{
    pokemonList: Pokemon[]
    favorites: Set<number>
    errorMessage?: string
  }>(),
  { errorMessage: 'No Pokemon found' }
)

const hasError = computed(() => props.pokemonList.length === 0)
</script>
<template>
  <div class="content" v-if="!hasError">
    <PokemonCard
      v-for="card in props.pokemonList"
      :key="card.id"
      :pokemon="card"
      :isFavorite="props.favorites.has(card.id)"
    />
  </div>
  <div class="error" v-else>
    <p>{{ props.errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-wrap: wrap;
}
.error {
  padding: 20px 0px;
  color: red;
}
</style>
