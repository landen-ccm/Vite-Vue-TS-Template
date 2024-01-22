<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { getPokemon, getPokemonByNameOrId } from '../api.calls'
import { type PaginationSizeTypes, type SinglePokemonResponse } from '../models/pokedex/index'

const searchQuery = ref('')
const pokemon = ref<(SinglePokemonResponse | undefined)[]>([])
const dropdownSizes: PaginationSizeTypes[] = [25, 50, 100, 'All']
const selectedSize = ref<PaginationSizeTypes>(25)
const selectedPage = ref(0)
const isFetching = ref(true)

async function searchHandler() {
  if (searchQuery.value === '') {
    await handleGetAllPokemon()
    return
  }
  try {
    isFetching.value = true
    const response = await fetchPokemonByNameOrId(searchQuery.value.toLowerCase())
    pokemon.value = response === undefined ? [] : [response.data]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

async function handleGetAllPokemon() {
  try {
    isFetching.value = true
    const pokemonListResponse = await fetchAllPokemon()
    if (pokemonListResponse) {
      const pokemonData = await Promise.all(
        pokemonListResponse.data.results.map((poke) => fetchPokemonByNameOrId(poke.name))
      )
      pokemon.value = pokemonData.map((poke) => poke?.data)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

async function fetchAllPokemon() {
  return await getPokemon(selectedSize.value, selectedPage.value)
}

async function fetchPokemonByNameOrId(nameOrId: string) {
  return await getPokemonByNameOrId(nameOrId)
}

onMounted(() => {
  handleGetAllPokemon()
})
</script>

<template>
  <div class="search-header">
    <div>
      <InputText
        class="search-bar"
        @keyup.enter="searchHandler"
        v-model="searchQuery"
        placeholder="Enter a Pokemon name or id"
      ></InputText>
      <Button @click="searchHandler">Search</Button>
    </div>
    <Dropdown :options="dropdownSizes" v-model="selectedSize"></Dropdown>
  </div>
  <div class="card-container">
    <div v-if="pokemon.length === 0 && !isFetching"><p>No Pokemon Found!</p></div>
    <PokemonCard
      v-for="(poke, idx) in pokemon"
      :key="poke ? poke.id : idx"
      :id="poke?.id"
      :name="poke?.name"
      :image="poke?.sprites.front_default"
    />
  </div>
  <Button>Previous</Button><Button>Next</Button>
</template>

<style scoped>
.search-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.search-bar {
  width: 250px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
