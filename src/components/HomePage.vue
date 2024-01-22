<script setup lang="ts">
import { onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Card from 'primevue/card'
import 'primeicons/primeicons.css'
import { fetchAllPokemon } from '@/helpers/homePageHelper'

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
const pokemonData = ref<pokemon[]>([])
const searchResult = ref<searchresult[]>([])
const isSearching = ref(false)

const showSearchResults = async () => {
  // isSearching.value = true
  // console.log(searchResult.value)
  // const temp = await fetchAllPokemon({ name: searchQuery.value })
  // console.log(temp)
  pokemonData.value = await fetchAllPokemon({ name: searchQuery.value })
  // console.log('search result', pokemonData.value[0])
}

onMounted(async () => {
  const param = { limit: pageSize.value }
  pokemonData.value = await fetchAllPokemon(param)
  // console.log(pokemonData.value)
})
</script>

<template>
  <div>
    <InputText
      v-model="searchQuery"
      placeholder="Search Pokemon"
      @keyup.enter="showSearchResults"
    />
    <Button @click="showSearchResults">Search</Button>
    <div>
      <Dropdown v-model="pageSize" :options="pageSizeOptions" />
    </div>
    <div>
      <ul>
        <li v-for="pokemon in pokemonData" :key="pokemon.name">
          <Card style="width: 12em; margin-bottom: 10px">
            <template #header>
              <h1>{{ pokemon.name }}</h1>
            </template>
            <template #title>
              <img
                alt="user header"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
              />
            </template>
            <template #subtitle> {{ pokemon.url.split('/')[6] }} </template>
            <template #content><Button>View Details</Button></template>
            <template #footer><i class="pi pi-heart"></i></template>
          </Card>
        </li>
      </ul>
    </div>
    <Button> Next</Button>
    <Button> previous</Button>
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
