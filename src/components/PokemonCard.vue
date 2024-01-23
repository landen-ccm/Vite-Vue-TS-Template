<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Pokemon } from '../api.calls'
import Button from 'primevue/button'

const props = defineProps<{
  pokemon: Pokemon
  isFavorite: boolean
}>()

const router = useRouter()

const addToFavorites = inject<(a: number) => void>('addFavorite', () => {})
const removeFromFavorites = inject<(a: number) => void>('removeFavorite', () => {})

function viewDetails() {
  const pokemonDetailName = '/pokemon/[id]'
  router.push({ name: pokemonDetailName, params: { id: props.pokemon.id } })
}
</script>
<template>
  <div class="pokemon-card">
    <div class="info">
      <h1>#{{ props.pokemon.id }} - {{ props.pokemon.name }}</h1>
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`"
      />
    </div>
    <div class="items">
      <i
        v-if="isFavorite"
        class="pi pi-heart-fill"
        v-tooltip.top="'Remove from Favorites'"
        @click="removeFromFavorites(props.pokemon.id)"
      ></i>
      <i
        v-else
        class="pi pi-heart"
        v-tooltip.top="'Add to Favorites'"
        @click="addToFavorites(props.pokemon.id)"
      ></i>
      <Button @click="viewDetails">View Details</Button>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  width: 360px;
  margin: 2rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
}

.pokemon-card h1 {
  font-size: 1.25rem;
  color: white;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.items {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.pi {
  cursor: pointer;
}
</style>
