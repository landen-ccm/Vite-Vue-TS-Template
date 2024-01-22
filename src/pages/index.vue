<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css'
import { searchParam, pageSize, pageSizes, displayData, sortedData, displayedPokemon } from './variables'
import { searchButtonHandler, getData } from '@/helpers/homepageHelpers'



onMounted(async () => {
  displayData.value = await getData(pageSize.value)
  displayedPokemon.value = displayData.value.results.map((pokemon) => {
    return {
      name: pokemon.name,
      id: pokemon.url.split('pokemon/')[1].slice(0, -1),
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('pokemon/')[1].slice(0, -1)}.png`
    }
  })
  // console.log(sortedData.value)
  console.log(displayedPokemon.value)
})

</script>
<template>
  <div>
    <InputText type="text" v-model="searchParam" @keyup.enter="searchButtonHandler(searchParam)" />
    <Button @click="searchButtonHandler(searchParam)">Search</Button>
  </div>

  <div class="card flex justify-content-center">
    <Dropdown v-model="pageSize" :options="pageSizes" placeholder="Page size" />
  </div>

  <div>
    <ul>
      <li v-for="pokemon in displayedPokemon" :key="pokemon.name">
        <base-card>
          <h2>{{ pokemon.name }}</h2>
          <img :src="pokemon.url" :alt="pokemon.name">
          <p>id: {{ pokemon.id }}</p>
          <i class="pi pi-heart"></i>
          <Button>View details</Button>
        </base-card>
      </li>
    </ul>
  </div>

  <div>
    <Button><i class="pi-angle-double-left">Prev</i></Button>
    <Button><i class="pi-angle-double-right">Next</i></Button>
  </div>
</template>
