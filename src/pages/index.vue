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

import router from '@/router'




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
// const searchResult = ref<searchresult[]>([])
// const isSearching = ref(false)
const favoritePokemon = ref<string[]>([])
const favoritesIsVisible = ref(false);

const toast = useToast();


const toggleFavoritesVisibility = () => {
  favoritesIsVisible.value = !favoritesIsVisible.value
}

const showSearchResults = async () => {

  pokemonData.value = await fetchAllPokemon({ name: searchQuery.value })
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

const showAddToFavorites = (message: string, severity: 'success' | 'error') => {
  toast.add({ severity: severity, detail: message, life: 3000 });
};

const addToFavorites = (name: string) => {
  if (localStorage.getItem('favoritePokemon') === null) {
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon.value))
  }
  if (favoritePokemon.value.includes(name)) {
    const itemIdx = favoritePokemon.value.indexOf(name)
    favoritePokemon.value.splice(itemIdx, 1);
    showAddToFavorites(`${name} removed from favorites`, 'error');
  } else {
    favoritePokemon.value.push(name);
    showAddToFavorites(`${name} added to favorites!`, 'success')
  }
  localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon.value))
  console.log(JSON.stringify(favoritePokemon.value))
  // console.log(favoritePokemon.value)
}

onMounted(async () => {
  const param = { limit: pageSize.value, page: pageNum.value }
  const data = await fetchAllPokemon(param);
  pokemonData.value = data.results;
  nextPage.value = data.next;
  prevPage.value = data.previous;
  console.log('local object:', localStorage.getItem('favoritePokemon'))
  favoritePokemon.value = JSON.parse(localStorage.getItem('favoritePokemon'))

})
</script>


<template>
  <div>
    <router-view></router-view>

    <Button @click="toggleFavoritesVisibility">{{ favoritesIsVisible ? 'Hide' : 'Show' }} favorites</Button>
    <div v-if="favoritesIsVisible">
      <h2>Favorite Pokemon</h2>
      <p>You have saved {{ favoritePokemon.length }} pokemon!</p>
      <p v-for="pokemon in favoritePokemon" :key="pokemon">{{ pokemon }}</p>
      <card v-for="pokemon in favoritePokemon" :key="pokemon">
        
      </card>
    </div>
    <div v-else>
      <InputText v-model="searchQuery" placeholder="Search Pokemon" @keyup.enter="showSearchResults" />
      <Button @click="showSearchResults">Search</Button>
      <div>
        <Dropdown @blur="fetchNewData()" v-model="pageSize" :options="pageSizeOptions" />
      </div>
      <div>
        <ul v-if="pokemonData">
          <!-- <li v-for="pokemon in pokemonData" :key="pokemon.name"> -->
          <base-card :pokemon="pokemon" v-for="pokemon in pokemonData" :key="pokemon.name"
            :addToFavorites="addToFavorites" :favoritePokemon="favoritePokemon"></base-card>
          <!-- </li> -->
        </ul>
        <p v-else>No pokemon found</p>
      </div>
      <Button :disabled="!prevPage" @click="fetchNewData(-1)"> Previous</Button>
      <Button :disabled="!nextPage" @click="fetchNewData(1)"> Next</Button>
    </div>
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
