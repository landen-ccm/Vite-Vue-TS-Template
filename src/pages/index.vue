<script setup lang="ts">
import { BASE_API_URL } from '@/helpers'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Image from 'primevue/image'

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
const isFavorite = ref(true)
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
  currentPokemon.value = await getPokemonByName(name)
  showList.value = false
}

onMounted(async () => {
  pokemonData.value = await getPokemon()
})
</script>
<template>
  <div>
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
    <ul v-if="showList">
      <li v-for="pokemon in pokemonData" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
    <div v-else>
      <div v-if="currentPokemon" class="p-card">
        <h2>{{ currentPokemon?.name.toUpperCase() }}</h2>
        <p>Id: {{ currentPokemon?.id }}</p>
        <div class="img-div">
          <Image :src="currentPokemon?.sprites.front_default" width="300" alt="pokemon-front" />
          <Image
            v-if="currentPokemon?.sprites.back_default"
            :src="currentPokemon?.sprites.back_default"
            width="300"
            alt="pokemon-back"
          />
        </div>
        <div>
          <i v-if="!isFavorite" class="pi pi-heart" style="font-size: 4rem"></i>
          <i v-else class="pi pi-heart-fill" style="font-size: 4rem"></i>
        </div>
        <Button>View</Button>
      </div>
      <div v-else class="error-message">
        <h1>NO POKEMON WITH THAT NAME OR ID!</h1>
      </div>
    </div>
  </div>
  <div class="btn-div">
    <Button label="Previous" />
    <Button label="Next" />
  </div>
</template>

<style lang="scss">
form {
  display: flex;
  justify-content: space-between;
}
.btn-div {
  display: flex;
  justify-content: space-between;
}
.card-container {
  display: flex;

  flex-wrap: wrap;
}

.error-message {
  width: 360px;

  margin: 2rem auto;

  padding: 1rem;

  font-size: xx-large;
}

.p-card {
  width: 360px;

  margin: 2rem auto;

  border: 1px solid #c8ced3;

  border-radius: 4px;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
}

.p-card h2 {
  font-size: 3rem;
}

.img-div {
  display: flex;
}
</style>
