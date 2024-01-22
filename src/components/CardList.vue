<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'

type PokemonData = {
  name: string
  url: string
}

type EnhancePokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

defineProps<{
  pokemonData: Array<PokemonData>
  offset: number
}>()
</script>

<template>
  <div class="card-container1">
    <Card v-for="(pokemon, idx) in pokemonData">
      <template #_id>{{ idx + offset + 1 }}</template>
      <template #name>{{ pokemon.name }}</template>
      <template #img
        ><img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + offset + 1}.png`"
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
