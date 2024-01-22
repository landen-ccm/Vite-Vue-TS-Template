<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css'
import { searchParam, pageSize, pageSizes, displayData, displayedPokemon } from './variables'
import { searchButtonHandler, getData } from '@/helpers/homepageHelpers'
import { capitalizeFirstLetter } from '../helpers/functions'



onMounted(async () => {
  displayData.value = await getData(pageSize.value)
  displayedPokemon.value = displayData.value.results.map((pokemon) => {
    return {
      name: pokemon.name,
      id: pokemon.url.split('pokemon/')[1].slice(0, -1),
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('pokemon/')[1].slice(0, -1)}.png`
    }
  })
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
    <div class="flex flex-column md:flex-row md:justify-content-between row-gap-3">
      <base-card class="flex flex-column" v-for="pokemon in displayedPokemon" :key="pokemon.name">
        <h3>{{ capitalizeFirstLetter(pokemon.name) }}</h3>
        <img :src="pokemon.url" :alt="pokemon.name">
        <div class="button-section">
          <Button v-tooltip.bottom="{
            value: 'Add to favorites',
            pt: {
              text: 'bg-primary font-medium'
            }
          }"><i class="pi pi-heart"></i></Button>
          <Button>View details</Button>
        </div>

      </base-card>
    </div>
  </div>

  <div>
    <Button><i class="pi-angle-double-left">Prev</i></Button>
    <Button><i class="pi-angle-double-right">Next</i></Button>
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

.button-section Button {
  margin: 5px
}
</style>
