<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { getallpokemon } from '@/composable/searchAllPokemon'
import type { Poke, Pokemon } from '@/helpers/PokeTypes'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import router from '@/router'

type PageCount = 25 | 50 | 100 | -1

const displayCountOptions: { text: string; value: PageCount }[] = [
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
  { text: 'all', value: -1 }
]

const query = router.currentRoute.value.query

const allPokemon = ref<Poke[] | null>(null)
const favoritesLength = ref(localStorage.length)
const pageNumber = ref(query.pageSize ? query.pageSize.toString() : 0)
const showCount = ref<PageCount>(query.pageIndex ? +query.pageIndex as PageCount : 25)
const disableForward = ref(false)
const disableBack = ref(true)
const toast = useToast()
const showFavorites = ref(false)
const favorites = ref({ ...localStorage })

const numberOfPages = computed(() => {
  if (allPokemon.value) {
    return allPokemon.value.length / showCount.value
  }
})

const paginatedData = computed(() => {
  const start = pageNumber.value * showCount.value
  const end = start + showCount.value
  swapPage()
  return allPokemon.value?.slice(start, end)
})

const toggleFav = () => {
  showFavorites.value = !showFavorites.value
  favorites.value = { ...localStorage }
}

const checkForFavorites = () => {
  if (allPokemon.value)
    for (const pokemon of allPokemon.value) {
      if (localStorage.getItem(pokemon.name)) {
        pokemon.isFav = true
      }
    }
}

const swapPage = () => {
  router.push({ name: '/', query: { pageSize: showCount.value, pageIndex: pageNumber.value}})
}

const forwardButtonHandler = () => {
  pageNumber.value += 1
  disableBack.value = false
  if (numberOfPages.value && Math.floor(numberOfPages.value) === pageNumber.value) {
    disableForward.value = true
  }
}

const backButtonHandler = () => {
  pageNumber.value -= 1
  disableForward.value = false
  if (pageNumber.value === 0) {
    disableBack.value = true
  }
}

const addToFavorites = (pokemon: Poke) => {
  if (pokemon.isFav != true) {
    toast.add({
      severity: 'success',
      summary: 'Added to Favorites',
      detail: `${pokemon.name} is added to favorites`,
      life: 3000
    })
  } else {
    toast.add({
      severity: 'info',
      summary: 'removed from Favorites',
      detail: `${pokemon.name} is removed from favorites`,
      life: 3000
    })
  }

  if (pokemon.isFav != true) {
    localStorage.setItem(`${pokemon.name}`, JSON.stringify(pokemon))
    favoritesLength.value += 1
    pokemon.isFav = true
  } else {
    localStorage.removeItem(`${pokemon.name}`)
    favoritesLength.value -= 1
    pokemon.isFav = false
  }
}

const addAllToFavorites = () => {
  paginatedData.value?.forEach((text) => {
    addToFavorites(text)
  })
}

const clearLocalStorage = () => {
  localStorage.clear();
  favoritesLength.value = 0;
  router.go();
}

const submit = async (res: Pokemon | null) => {
  if (res) {
    allPokemon.value = [{ name: res.name, url: `https://pokeapi.co/api/v2/pokemon/${res.id}` }]
    checkForFavorites()
  } else {
    allPokemon.value = await getallpokemon()
    checkForFavorites()
  }
}

onMounted(async () => {
  allPokemon.value = await getallpokemon()
  checkForFavorites()
  // console.log(Object.keys({ ...localStorage }))
  // const butterfree = localStorage.butterfree
  // console.log(JSON.parse(butterfree).name)
})
</script>

<template>
  <Button @click="toggleFav">favorites {{ favoritesLength }}</Button>
  <div>
    <div v-if="!showFavorites">
      <Button @click="addAllToFavorites" v-if="showCount !== -1">Add all to favorites</Button>
      <SearchBar @submit="submit"></SearchBar>
      <Dropdown v-model="showCount" :options="displayCountOptions" optionLabel="text" optionValue="value"></Dropdown>
      <!-- <pre style="color: black;">{{ paginatedData }}</pre> -->
      <div class="card-container">
        <ul v-if="allPokemon" class>
          <li v-for="pokemon in paginatedData" :key="pokemon.name">
            <Card class="p-card">
              <template #title> {{ pokemon.name }} </template>
              <template #content>
                <p class="m-0">
                  <img
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
                    alt="Pokemon Image" />
                </p>
                <Button>
                  <router-link :to="{
                    path: `/pokemonDetails/${pokemon.name}`,
                    query: { pokemon: pokemon.url.split('/')[6] }
                  }">view</router-link>
                </Button>
              </template>
              <template #footer>
                <Toast />
                <i :class="pokemon.isFav === true ? 'pi pi-heart-fill' : 'pi pi-heart'"
                  @click="addToFavorites(pokemon)"></i>
              </template>
            </Card>
          </li>
        </ul>
        <p v-else>No Pokémon data available.</p>
      </div>
    </div>
    <div id="test-favorites" v-else>
      <Button @click="clearLocalStorage">Remove all favorites</Button>
      <SearchBar @submit="submit"></SearchBar>
      <Dropdown v-model="showCount" :options="displayCountOptions" optionLabel="text" optionValue="value"></Dropdown>
      <ul>
        <li v-for="pokemon in Object.values(favorites)" :key="JSON.parse(pokemon).name">
          <Card class="p-card">
            <template #title> {{ JSON.parse(pokemon).name }} </template>
            <template #content>
              <p class="m-0">
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${JSON.parse(pokemon).url.split('/')[6]}.png`"
                  alt="Pokemon Image" />
              </p>
              <Button>
                <router-link :to="{
                  path: `/pokemonDetails/${pokemon.name}`,
                  query: { pokemon: JSON.parse(pokemon).url.split('/')[6] }
                }">view</router-link>
              </Button>
            </template>
          </Card>
        </li>
      </ul>
    </div>
    <Button data-test="back-button" class="page-button" @click="backButtonHandler" :disabled="disableBack">Back</Button>
    <Button data-test="forward-button" class="page-button" @click="forwardButtonHandler" :disabled="disableForward">Forwards</Button>
  </div>
  <footer>{{ pageNumber + 1 }}</footer>
</template>

<style lang="scss">
.page-button {
  margin-left: 1em;
}

.page-button:disabled {
  opacity: 0.2;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.p-card {
  width: 200px;
  margin: 1rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
}

ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
  text-align: center;
}
</style>
