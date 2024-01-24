<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import SearchBox from '@/components/search/SearchBox.vue'

import { ref } from 'vue'

import 'primeicons/primeicons.css'
import { getListOfPokemon, searchByName } from '@/helpers/apiCalls'
import type { PokeCard, PokemonInfo } from '@/helpers/shared'
import axios from 'axios'
import router from '@/router'

const selectedNum = ref<string | number>(25)
const pageSizes = [25, 50, 100, 'all']
const pokemonList = ref<PokeCard[]>([])

//sumanth
const currentPageSize = ref<'all' | number>(25)
const totalPages = ref<number>(0)
const itemsPerPage = ref<number>(currentPageSize.value === 'all' ? 100000 : currentPageSize.value)

totalPages.value = Math.ceil(1302 / itemsPerPage.value)

watch(selectedNum, (newValue, oldValue) => {
  itemsPerPage.value = newValue === 'all' ? 10000 : Number(newValue)
  totalPages.value = Math.ceil(1302 / itemsPerPage.value)
  console.log('TotalPages', totalPages.value)
  fetchCards()
})

const navigateToFavorites = () => {
  router.push('/favoritesPage')
}
const currentPage = ref(0)

const fetchCards = async (newPage?: number) => {
  try {
    if (newPage !== undefined) {
      currentPage.value = newPage
    }
    const temp = await getListOfPokemon(itemsPerPage.value, currentPage.value)!
    if (temp === null || typeof temp?.results === 'undefined') {
      console.log("Couldn't fetch, dying quietly...")
      return
    }
    pokemonList.value.length = 0
    for (const poke of temp.results) {
      const { data } = await axios.get<PokemonInfo>(poke.url)

      pokemonList.value.push({
        name: data.name,
        imageUrl: data.sprites.front_default,
        id: data.id
      })
    }
  } catch (error) {
    console.log(error)
  }
}

async function onSubmit(name: string) {
  try {
    const data = await searchByName(name)
    console.log(data)
    if (!data) {
      alert(`Couldn't find '${name}'`)
    } else {
      pokemonList.value.length = 0
      pokemonList.value.push({
        name: data.name,
        imageUrl: data.sprites.front_default,
        id: data.id
      })
    }
  } catch (error) {
    alert(`Couldn't find '${name}'`)
  }
}

onMounted(() => fetchCards())
</script>

<template>
  <Button @click="navigateToFavorites">Favorites</Button>
  <div class="card-container main-box">
    <search-box @submit="onSubmit" class="card"></search-box>
    <div id="poke-list" class="poke-list">
      <PokemonCard
        v-for="poke in pokemonList"
        :key="poke.id"
        :id="poke.id"
        :name="poke.name"
        :image-url="poke.imageUrl"
      />
    </div>
    <div class="dropdown p-card card flex">
      <Dropdown v-model="selectedNum" :options="pageSizes" />
      <Button
        icon="pi pi-arrow-left"
        aria-label="Submit"
        @click="fetchCards(currentPage - 1)"
        :disabled="currentPage === 0"
      />
      <Button
        icon="pi pi-arrow-right"
        aria-label="Submit"
        @click="fetchCards(currentPage + 1)"
        :disabled="currentPage === totalPages - 1"
      />
    </div>
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
}

.poke-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>
