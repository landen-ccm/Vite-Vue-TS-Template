<script setup lang="ts">
import { BASE_API_URL } from '@/helpers'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import PokemonCard from '@/components/PokemonCard.vue'

const router = useRouter()

type PaginationOptionsType = '25' | '50' | '100' | 'All'
type PokemonData = {
  name: string
  url: string
}

type EnhancedPokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

type favoriteEvent = {
  name: string
  id: number
  type: string
}

type favoritePokemonData = {
  name: string
  id: number
}

const paginationOptions: PaginationOptionsType[] = ['25', '50', '100', 'All']
const pokemonData = ref<PokemonData[]>([])
const showList = ref(true)
const currentPokemon = ref<EnhancedPokemonData>()
const isFavorite = ref(false)
const searchTerm = ref('')
const paginationSelection = ref<PaginationOptionsType>()
const previous = ref('')
const next = ref('')
const offset = ref(0)
const favoriteList = ref<favoritePokemonData[]>([])
const favoriteVisible = ref(false)

async function getPokemonByName(name: string) {
  try {
    const response = await axios.get(`${BASE_API_URL}/${name.toLowerCase()}`)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

function switchFavorite() {
  favoriteVisible.value = !favoriteVisible.value
}

watch(paginationSelection, async () => {
  pokemonData.value = await getPokemon()
})

async function getPokemon() {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/?limit=${paginationSelection.value == 'All' ? 1302 : paginationSelection.value}`
    )
    previous.value = response.data.previous
    next.value = response.data.next
    return response.data.results
  } catch (error) {
    console.log(error)
  }
}

async function displayDetails(name: string) {
  if (!name) {
    showList.value = true
    return
  }
  currentPokemon.value = await getPokemonByName(name)
  showList.value = false
}

async function handlePrevious() {
  const response = await axios.get(previous.value)
  previous.value = response.data.previous
  next.value = response.data.next
  pokemonData.value = response.data.results
  offset.value -=
    paginationSelection.value == 'All' ? 1302 : parseInt(paginationSelection.value as string)
}

async function handleNext() {
  const response = await axios.get(next.value)
  previous.value = response.data.previous
  next.value = response.data.next
  pokemonData.value = response.data.results
  offset.value +=
    paginationSelection.value == 'All' ? 1302 : parseInt(paginationSelection.value as string)
}

function handleFavorite(data: favoriteEvent) {
  const name = data.name
  const id = data.id
  const type = data.type
  console.log(data)
  console.log(favoriteList)
  if (type == 'add') {
    favoriteList.value.push({ name: name, id: id })
  } else {
    for (let i = 0; i < favoriteList.value.length; i++) {
      if (favoriteList.value[i].id == id) {
        favoriteList.value.splice(i, 1)
        break
      }
    }
  }
  console.log('aaaa')
  localStorage.setItem('favorite', JSON.stringify(favoriteList.value))
}

onMounted(async () => {
  pokemonData.value = await getPokemon()
  favoriteList.value =
    JSON.parse(localStorage.getItem('favorite') as string) == null
      ? []
      : JSON.parse(localStorage.getItem('favorite') as string)
})
</script>
<template>
  <div>
    <Button :disabled="true"># of favoritepokemon: {{ favoriteList.length }}</Button>
    <Button @click="switchFavorite">Search/View Favorite</Button>
  </div>
  <div v-if="favoriteVisible" class="favoritePage">
    <ul v-if="showList" class="pokemon-grid">
      <FavoriteCard
        v-for="pokemon in favoriteList"
        :id="pokemon.id"
        :name="pokemon.name"
      ></FavoriteCard>
    </ul>
  </div>
  <div v-else class="searchPage">
    <div class="container">
      <form @submit.prevent="displayDetails(searchTerm)" class="p-input-icon-left">
        <i class="pi pi-search" @click="displayDetails(searchTerm)" />
        <InputText
          class="search-bar"
          size="large"
          type="text"
          placeholder="Find a Pokémon"
          v-model.trim="searchTerm"
        />
        <Dropdown
          v-model="paginationSelection"
          :options="paginationOptions"
          placeholder="Per Page"
          class="w-full md:w-14rem"
        />
      </form>
    </div>
    <div>
      <ul v-if="showList" class="pokemon-grid">
        <PokemonCard
          v-for="pokemon in pokemonData"
          :key="pokemon.name"
          :name="pokemon.name"
          :id="parseInt(pokemon.url.split('/')[6])"
          :sprites="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
          :favorite_list="favoriteList"
          @favorite-event="handleFavorite"
        ></PokemonCard>
      </ul>
      <PokemonCard
        v-else
        :name="currentPokemon?.name"
        :id="currentPokemon?.id"
        :sprites="currentPokemon?.sprites.front_default"
        :is-favorite="isFavorite"
        :showList="showList"
        :favorite_list="favoriteList"
      ></PokemonCard>
    </div>
    <div class="btn-div">
      <Button @click="handlePrevious" label="Previous" />
      <Button @click="handleNext" label="Next" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 4rem;
}
form {
  display: flex;
  justify-content: space-between;
}
.btn-div {
  display: flex;
  justify-content: space-between;
}

.pokemon-grid {
  /* Activate grid layout */
  display: grid;

  /* Create 5 columns, each 1 "fractional unit" wide */
  grid-template-columns: repeat(5, 1fr);

  /* Create 5 rows, each 1 "fractional unit" high */
  grid-template-rows: repeat(5, 1fr);

  /* Add a 10px gap between columns and rows */
  grid-gap: 10px;
}

.item {
  background-color: rgba(229, 229, 229, 0.5);
  border: 1px solid rgba(128, 128, 128, 0.5);
  padding: 0.25em;
}
</style>
