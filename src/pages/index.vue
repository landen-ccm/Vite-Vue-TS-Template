<script setup lang="ts">
import { BASE_API_URL } from '@/helpers'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

import PokemonCard from '@/components/PokemonCard.vue'

type PaginationOptionsType = '25' | '50' | '100' | 'All'
type PokemonData = {
  name: string
  url: string
}

type EnhancedPokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

const paginationOptions: PaginationOptionsType[] = ['25', '50', '100', 'All']
const pokemonData = ref<PokemonData[]>([])
const showList = ref(true)
const currentPokemon = ref<EnhancedPokemonData>()
const isFavorite = ref(false)
const searchTerm = ref('')
const paginationSelection = ref<PaginationOptionsType>()

async function getPokemonByName(name: string) {
  try {
    const response = await axios.get(`${BASE_API_URL}/${name.toLowerCase()}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function getPokemon() {
  try {
    const response = await axios.get(`${BASE_API_URL}/?limit=25`)
    console.log(response.data.results)
    return response.data.results
  } catch (error) {
    console.log(error)
  }
}

async function displayDetails(name: string) {
  if (!name) {
    showList.value = true
    return
  }
  currentPokemon.value = await getPokemonByName(name)
  showList.value = false
}

onMounted(async () => {
  pokemonData.value = await getPokemon()
})
</script>
<template>
  <div class="container">
    <form @submit.prevent="displayDetails(searchTerm)" class="p-input-icon-left">
      <i class="pi pi-search" @click="displayDetails(searchTerm)" />
      <InputText
        class="search-bar"
        size="large"
        type="text"
        placeholder="Find a Pokémon"
        v-model.trim="searchTerm"
      />
      <Dropdown
        v-model="paginationSelection"
        :options="paginationOptions"
        placeholder="Per Page"
        class="w-full md:w-14rem"
      />
    </form>
  </div>
  <div>
    <ul v-if="showList" class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in pokemonData"
        :key="pokemon.name"
        :name="pokemon.name"
        :id="parseInt(pokemon.url.split('/')[6])"
        :sprites="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
      ></PokemonCard>
    </ul>
    <PokemonCard
      v-else
      :name="currentPokemon?.name"
      :id="currentPokemon?.id"
      :sprites="currentPokemon?.sprites.front_default"
      :is-favorite="isFavorite"
      :showList="showList"
    ></PokemonCard>
  </div>
  <div class="btn-div">
    <Button label="Previous" />
    <Button label="Next" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 4rem;
}
form {
  display: flex;
  justify-content: space-between;
}
.btn-div {
  display: flex;
  justify-content: space-between;
}

.error-message {
  width: 360px;

  margin: 2rem auto;

  padding: 1rem;

  font-size: xx-large;
}

.pokemon-grid {
  /* Activate grid layout */
  display: grid;

  /* Create 5 columns, each 1 "fractional unit" wide */
  grid-template-columns: repeat(5, 1fr);

  /* Create 5 rows, each 1 "fractional unit" high */
  grid-template-rows: repeat(5, 1fr);

  /* Add a 10px gap between columns and rows */
  grid-gap: 10px;
}

.item {
  background-color: rgba(229, 229, 229, 0.5);
  border: 1px solid rgba(128, 128, 128, 0.5);
  padding: 0.25em;
}
</style>
