<script setup lang="ts">
import { onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Card from 'primevue/card'
import 'primeicons/primeicons.css'
import { fetchAllPokemon } from '@/helpers/homePageHelper'

import { useToast } from 'primevue/usetoast';



type pokemon = {
  name: string
  url: string
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

const favoritePokemon = ref(new Map<string, pokemon>())
const favoritesIsVisible = ref(false);

const toast = useToast();


const toggleFavoritesVisibility = () => {
  favoritesIsVisible.value = !favoritesIsVisible.value
  console.log(favoritePokemon.value.entries())
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

const loadFavorites = () => {
  const store = localStorage.getItem("favoritePokemon")
  if (store === null || store === "") {
    favoritePokemon.value = new Map<string, pokemon>()
  } else {
    const val = JSON.parse(store)
    favoritePokemon.value = new Map(Object.entries(val))
  }
}

const addToFavorites = (pokemon: pokemon) => {
  if (!favoritePokemon.value.has(pokemon.name)) {
    favoritePokemon.value.set(pokemon.name, pokemon)
    showAddToFavorites(`${pokemon.name} added to favorites!`, 'success')
  } else {
    favoritePokemon.value.delete(pokemon.name)
    showAddToFavorites(`${pokemon.name} removed from favorites`, 'error');
  }

  const jstring = JSON.stringify(Object.fromEntries(favoritePokemon.value))
  localStorage.setItem('favoritePokemon', jstring)
}

onMounted(async () => {
  const param = { limit: pageSize.value, page: pageNum.value }
  const data = await fetchAllPokemon(param);
  pokemonData.value = data.results;
  nextPage.value = data.next;
  prevPage.value = data.previous;
  console.log('local object:', localStorage.getItem('favoritePokemon'))
  loadFavorites()
})
</script>


<template>
  <div>
    <router-view></router-view>

    <Button @click="toggleFavoritesVisibility">{{ favoritesIsVisible ? 'Hide' : 'Show' }} favorites</Button>
    <div v-if="favoritesIsVisible">
      <h2>Favorite Pokemon</h2>
      <p>You have saved {{ favoritePokemon.size }} pokemon!</p>
      <ul v-if="favoritePokemon.size != 0">
        <base-card :pokemon="pokemon" v-for="pokemon in favoritePokemon.values()" :key="pokemon.name"
          :addToFavorites="addToFavorites" :favoritePokemon="favoritePokemon" :id="3"
          :url="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`">
        </base-card>
      </ul>
    </div>
    <div v-else>
      <InputText v-model="searchQuery" placeholder="Search Pokemon" @keyup.enter="showSearchResults" />
      <Button @click="showSearchResults">Search</Button>
      <div>
        <Dropdown @blur="fetchNewData()" v-model="pageSize" :options="pageSizeOptions" />
      </div>
      <div>
        <ul v-if="pokemonData">
          <base-card :pokemon="pokemon" v-for="pokemon in pokemonData" :key="pokemon.name"
            :addToFavorites="addToFavorites" :favoritePokemon="favoritePokemon" :id="pokemon.url.split('/')[6]"
            :url="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"></base-card>
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
