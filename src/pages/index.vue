<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { getPokemon, getPokemonByNameOrId } from '../api.calls'
import { type PaginationSizeTypes, type SinglePokemonResponse } from '../models/pokedex/index'
import { isFav } from '@/helpers'
import FavoritesView from '@/components/FavoritesView.vue'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const FINAL_POKEMON_ID = 10277
const router = useRouter()
const searchQuery = ref('')
const pokemon = ref<(SinglePokemonResponse | undefined)[]>([])
const dropdownSizes: PaginationSizeTypes[] = [25, 50, 100, 'All']
const selectedSize = ref<PaginationSizeTypes>(25)
const selectedPage = ref(0)
const isFetching = ref(true)
const showFav = ref(false)

const inputtext = ref()

async function searchHandler() {
  if (searchQuery.value === '') {
    selectedSize.value = 25
    selectedPage.value = 0
    await handleGetAllPokemon()
    return
  }
  try {
    isFetching.value = true
    const response = await fetchPokemonByNameOrId(searchQuery.value.toLowerCase())
    pokemon.value = response === undefined ? [] : [response.data]
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

async function handleGetAllPokemon() {
  try {
    isFetching.value = true
    const pokemonListResponse = await fetchAllPokemon()
    if (pokemonListResponse) {
      const pokemonData = await Promise.all(
        pokemonListResponse.data.results.map((poke) => fetchPokemonByNameOrId(poke.name))
      )
      pokemon.value = pokemonData.map((poke) => poke?.data)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

async function fetchAllPokemon() {
  return await getPokemon(selectedSize.value, selectedPage.value)
}

async function fetchPokemonByNameOrId(nameOrId: string) {
  return await getPokemonByNameOrId(nameOrId)
}

function handleView(id: number) {
  router.push({
    name: '/details/[id]',
    params: { id: id }
  })
}

async function handleClick(btnType: string) {
  if (btnType === 'next') {
    selectedPage.value++
  } else {
    selectedPage.value--
  }
  await handleGetAllPokemon()
}

async function addAll() {
  if (selectedSize.value == 'All') return
  const from = selectedPage.value * selectedSize.value + 1
  const to = (selectedPage.value + 1) * selectedSize.value
  for (let i = from; i <= to; i++) {
    let check = true
    for (let j = 0; j < isFav.value.length; j++) {
      if (isFav.value[j].id == i) {
        check = false
        break
      }
    }
    if (check) {
      const result = await fetchPokemonByNameOrId('' + i)
      isFav.value.push(result.data)
    }
  }
}

function removeAll() {
  isFav.value = []
}

function handleLike(id: number) {
  const pokemonObj = pokemon.value.find((x) => {
    return x?.id === id
  }) as SinglePokemonResponse

  if (isFav.value.some((x) => x.id === pokemonObj.id)) {
    isFav.value = isFav.value.filter((x) => x.id !== pokemonObj.id)
    toast.add({
      severity: 'error',
      summary: 'Danger',
      detail: ' Pokemon Removed!',
      life: 3000
    })
  } else {
    isFav.value.push({ id: pokemonObj.id, name: pokemonObj.name, sprites: pokemonObj.sprites })
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: ' Pokemon Added to Favorites!',
      life: 3000
    })
  }
}

function handleFav() {
  showFav.value = !showFav.value
}

onMounted(() => {
  handleGetAllPokemon()
})

</script>

<template>
  <Toast />
  <InputText v-model="inputtext" data-test="inputtext"></InputText>
  <div data-test="showtext">{{ inputtext }}</div>
  <h2 v-if="!showFav" @click="handleFav" class="fav">Favorites {{ isFav?.length }}</h2>
  <h2 v-else @click="handleFav" class="fav">Back to list</h2>

  <div v-if="showFav">
    <FavoritesView :is-fav="isFav" @like="handleLike"></FavoritesView>
  </div>
  <div v-else>
    <div class="search-header">
      <div>
        <InputText
          class="search-bar"
          @keyup.enter="searchHandler"
          v-model="searchQuery"
          placeholder="Enter a Pokemon name or id"
        ></InputText>
        <Button @click="searchHandler">Search</Button>
        <Button @click="addAll" style="margin-left: 5px; margin-right: 5px"
          >Add all to Favorites</Button
        >
        <Button :disabled="selectedSize == 'All'" @click="removeAll"
          >Remove all from Favorites</Button
        >
      </div>
      <Dropdown
        :options="dropdownSizes"
        v-model="selectedSize"
        @change="handleGetAllPokemon"
      ></Dropdown>
    </div>
    <div class="card-container">
      <div v-if="pokemon.length === 0 && !isFetching"><p>No Pokemon Found!</p></div>
      <PokemonCard
        v-for="(poke, idx) in pokemon"
        :key="poke ? poke.id : idx"
        :id="poke?.id"
        :name="poke?.name"
        :image="poke?.sprites.front_default"
        :is-fav="isFav"
        @like="handleLike"
        @view="handleView"
      />
    </div>
    <div class="btn-div">
      <Button v-if="selectedPage > 0" @click="handleClick('prev')">Previous</Button
      ><Button
        v-if="!pokemon.find((x) => (x?.id as number) >= FINAL_POKEMON_ID)"
        @click="handleClick('next')"
        >Next</Button
      >
    </div>
  </div>
</template>

<style scoped>
.search-header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.search-bar {
  width: 250px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.fav {
  cursor: pointer;
  text-decoration: underline;
}

.btn-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
