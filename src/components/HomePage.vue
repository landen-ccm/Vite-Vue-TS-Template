<script setup lang="ts">
import { onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Card from 'primevue/card'
import 'primeicons/primeicons.css'
import { fetchAllPokemon } from '@/helpers/homePageHelper'

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';




type pokemon = {
  name: string
  url: string
  isFav: boolean
}

type searchresult = {
  name: string
  url: string
}

const searchQuery = ref('')
const pageSizeOptions = ['25', '50', '100', 'all']
const pageSize = ref('25')
const pageNum = ref(0)
const nextPage = ref(null);
const prevPage = ref(null);
const pokemonData = ref<pokemon[]>([])
const searchResult = ref<searchresult[]>([])
const isSearching = ref(false)
const favoritePokemon = ref<string[]>([])
const favoritesIsVisible = ref(false);

const toggleFavoritesVisibility = () => {
  favoritesIsVisible.value = !favoritesIsVisible.value
}

const showSearchResults = async () => {
  // isSearching.value = true
  // console.log(searchResult.value)
  // const temp = await fetchAllPokemon({ name: searchQuery.value })
  // console.log(temp)
  pokemonData.value = await fetchAllPokemon({ name: searchQuery.value })
  // console.log('search result', pokemonData.value[0])
}




const fetchNewData = async (numToAdd?: number) => {
  if (typeof numToAdd === 'number') {
    console.log(pageNum.value)
    pageNum.value += numToAdd;
  }
  console.log(pageSize.value, pageNum.value)
  const data = await fetchAllPokemon({ limit: pageSize.value, page: pageNum.value })
  console.log(data);
  pokemonData.value = data.results;
  nextPage.value = data.next;
  prevPage.value = data.previous;
}


onMounted(async () => {
  const param = { limit: pageSize.value, page: pageNum.value }
  const data = await fetchAllPokemon(param);
  // console.log(data);
  pokemonData.value = data.results;
  nextPage.value = data.next;
  prevPage.value = data.previous;
  // console.log(prevPage.value)
  // console.log(pokemonData.value)
})
</script>

<template>
  <div>
    <Button @click="toggleFavoritesVisibility">{{ favoritesIsVisible ? 'Hide' : 'Show' }} favorites</Button>
    <div v-if="favoritesIsVisible">
      <h2>Favorite Pokemon</h2>
      <p>You have saved {{ favoritePokemon.length }} pokemon!</p>
      <p v-for="pokemon in favoritePokemon" :key="pokemon">{{ pokemon }}</p>
    </div>
    <InputText v-model="searchQuery" placeholder="Search Pokemon" @keyup.enter="showSearchResults" />
    <Button @click="showSearchResults">Search</Button>
    <div>
      <Dropdown @blur="fetchNewData()" v-model="pageSize" :options="pageSizeOptions" />
    </div>
    <div>
      <ul v-if="pokemonData">
        <!-- <li v-for="pokemon in pokemonData" :key="pokemon.name"> -->
          <base-card :pokemon="pokemon" v-for="pokemon in pokemonData" :key="pokemon.name"></base-card>
        <!-- </li> -->
      </ul>
      <p v-else>No pokemon found</p>
    </div>
    <Button :disabled="!prevPage" @click="fetchNewData(-1)"> Previous</Button>
    <Button :disabled="!nextPage" @click="fetchNewData(1)"> Next</Button>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
}

h4 {
  padding: 3px;
}
</style>
