<script setup lang="ts">
import axios from 'axios'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

const searchQuery = ref('')
const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`
const pokemon = ref()
const searchError = ref(false)
const dropdownSizes = [25, 50, 100, 'All']
const selectedSize = ref(25)

function searchHandler() {
  console.log(pokemonURL + searchQuery.value)
  getPokemon(searchQuery.value)
}

function getPokemon(query: string) {
  axios
    .get(pokemonURL + query)
    .then((result) => {
      searchError.value = false
      pokemon.value = result.data
    })
    .catch((error) => {
      searchError.value = true
      console.log(error)
    })
}

onMounted(() => {
  getPokemon('')
})
</script>

<template>
  <div>
    <i class="pi pi-check"></i>
    <p v-if="searchError">Error: Invalid id or name</p>
    <InputText
      @keyup.enter="searchHandler"
      v-model="searchQuery"
      placeholder="enter a Pokemon name or id"
      size="normal"
    ></InputText>
    <Button @click="searchHandler">search</Button>
  </div>
  <Dropdown :options="dropdownSizes" v-model="selectedSize"></Dropdown>
  <div>
    {{ pokemon }}
  </div>
  <Button>Previous</Button><Button>Next</Button>
</template>
