<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'
import {
  searchParam,
  pageSize,
  pageSizes,
  displayData,
  displayedPokemon,
  currentPage,
  pokeFavorites
} from './variables'
import { searchButtonHandler, getData } from '@/helpers/homepageHelpers'
import { capitalizeFirstLetter } from '../helpers/functions'

const router = useRouter()

const updateDisplayed = async () => {
  displayData.value = await getData(currentPageSize.value, currentPage.value)
  displayedPokemon.value = displayData.value.results.map((pokemon) => {
    return {
      name: pokemon.name,
      id: +pokemon.url.split('pokemon/')[1].slice(0, -1),
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('pokemon/')[1].slice(0, -1)}.png`
    }
  })
}

const currentPageSize = computed(() => {
  const num: number = +pageSize.value
  console.log(num)
  if (isNaN(num)) {
    return 100000 // This is bad, this should never be a hard coded value!
  } else {
    return num
  }
})

const movePage = (direction: 1 | -1) => {
  currentPage.value += direction
  updateDisplayed()
}

onMounted(() => updateDisplayed())
</script>
<template>
  <div>
    <InputText type="text" v-model="searchParam" @keyup.enter="searchButtonHandler(searchParam)" />
    <Button @click="searchButtonHandler(searchParam)">Search</Button>
    <Button @click="router.push({ name: 'favorites' })"
      >Favorites: {{ pokeFavorites.length }}</Button
    >
  </div>

  <div class="card flex justify-content-center">
    <Dropdown
      @change="updateDisplayed()"
      v-model="pageSize"
      :options="pageSizes"
      placeholder="Page size"
    />
  </div>

  <div class="flex flex-column md:flex-row md:justify-content-between row-gap-3">
    <PokeCard
      class="flex flex-column"
      v-for="pokemon in displayedPokemon"
      :key="pokemon.name"
      :name="pokemon.name"
      :id="+pokemon.id"
      :url="pokemon.url"
    />
  </div>
  <div>
    <Button :disabled="currentPage <= 0" @click="movePage(-1)"
      ><i class="pi-angle-double-left">Prev</i></Button
    >
    <Button @click="movePage(1)" :disabled="displayData.next === null"
      ><i class="pi-angle-double-right">Next</i></Button
    >
  </div>
</template>

<style scoped>
img {
  width: 300px;
  height: auto;
}

li {
  width: 30%;
}

button {
  margin-left: 2em;
}

.button-section Button {
  margin: 5px;
}
</style>
