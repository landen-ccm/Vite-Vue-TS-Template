<script setup lang="ts">
import type { Pokemon } from '../api.calls'
import Button from 'primevue/button'
const props = defineProps<{
  pokemon: Pokemon
}>()
</script>
<template>
  <div class="pokemon-card">
    <h1>Name: {{ props.pokemon.name }}</h1>
    <p>Id: {{ props.pokemon.id }}</p>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`"
    />
    <div>
      <i class="pi pi-heart" v-tooltip="'Favorite this pokemon'"></i>
      <Button>View Details</Button>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  background-color: lightblue;
  outline-style: solid;
}
</style>
