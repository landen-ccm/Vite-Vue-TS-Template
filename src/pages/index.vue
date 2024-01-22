<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { getallpokemon } from '@/composable/searchAllPokemon'
import type { Poke } from '@/helpers/PokeTypes'

type PageCount = 25 | 50 | 100 | -1

const displayCountOptions: { text: string; value: PageCount }[] = [
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
  { text: 'all', value: -1 }
]

const allPokemon = ref<Poke[] | null>(null)

const submit = async (res) => {
  if (res) {
    allPokemon.value = [{ name: res.name, url: `https://pokeapi.co/api/v2/pokemon/${res.id}` }]
  } else {
    allPokemon.value = await getallpokemon()
  }
}

onMounted(async () => {
  allPokemon.value = await getallpokemon()
})

const showCount = ref<PageCount>(25)
</script>
<template>
  <SearchBar @submit="submit"></SearchBar>
  <div>
    <Dropdown
      v-model="showCount"
      :options="displayCountOptions"
      optionLabel="text"
      optionValue="value"
    ></Dropdown>
    <h1>All Pokémon</h1>
    <div class="card-container">
      <ul v-if="allPokemon" class>
        <li v-for="pokemon in allPokemon" :key="pokemon.name">
          <Card class="p-card">
            <template #title> {{ pokemon.name }} </template>
            <template #content>
              <p class="m-0">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
                  alt="Pokemon Image"
                />
              </p>
              <Button> view</Button>
            </template>
            <template #footer><i class="pi pi-heart"></i></template>
          </Card>
        </li>
      </ul>
      <p v-else>No Pokémon data available.</p>
    </div>
    <Button class="page-button">Back</Button>
    <Button class="page-button">Forwards</Button>
  </div>
</template>

<style lang="scss">
.page-button {
  margin-left: 1em;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.p-card {
  width: 200px;
  margin: 1rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
}

ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
}
</style>
