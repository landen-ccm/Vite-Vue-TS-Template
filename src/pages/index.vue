<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import {
  type PokemonDetails,
  type PaginatedPokemon,
  type Pokemon,
  type NameAndUrl
} from '@/helpers/PokeTypes'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import {
  detailedPage,
  getAllPokemon,
  getPaginatedPokemon,
  getPokemonDetails
} from '@/helpers/pokeAPI'
import { capitalizeFirstLetter } from '@/helpers/formatting'
import DataView from 'primevue/dataview'
import PokemonCard from '@/components/PokemonCard.vue'
import { saveFavorites } from '@/helpers/storage'

type PageCount = 25 | 50 | 100 | -1

const displayCountOptions: { text: string; value: PageCount }[] = [
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
  { text: 'all', value: -1 }
]

const query = router.currentRoute.value.query

const pageNumber = ref(3)
const pageCount = ref(24)
const pokemonList = ref<PaginatedPokemon | null>()
const pokemonDetails = ref<(PokemonDetails | null)[]>([])
const selectedPokemon = ref<PokemonDetails | null>()
const detailedPokemon = ref<PokemonDetails>()
const favorites = ref<{ [key: number]: true | undefined }>({})
const loading = ref<boolean>(true)

const lazyParams = ref<{ first: number; page: number; rows: number }>({
  first: 1,
  page: 0,
  rows: 24
})

async function cacheDetails(id: number) {
  // Using null to guard against spamming the api
  pokemonDetails.value[id] = null
  const theDeets = await getPokemonDetails(id + 1)
  pokemonDetails.value[id] = theDeets
}

function lazyLoadPokemon(event: any) {
  loading.value = true
  console.dir(event)
  lazyParams.value = { ...lazyParams.value, first: event?.first || lazyParams.value.first }
  detailedPage(lazyParams.value.page, lazyParams.value.rows).then((pokes) => {
    console.log('Loaded!')
    loading.value = false
    pokemonDetails.value = pokes.filter((poke) => (poke !== null ? poke : undefined))
  })
}
function onPage(event: any) {
  console.log('PAGE!')
  console.dir(event)
  lazyParams.value = event
  lazyLoadPokemon(event)
}

onMounted(async () => {
  pokemonList.value = await getAllPokemon()
  lazyLoadPokemon({ first: 0 })
  const details = await getPokemonDetails(59) //59)
})

function updateSelection(newSelection: PokemonDetails) {
  selectedPokemon.value = newSelection
  detailedPokemon.value = newSelection
}

function isSelected(pokemon: PokemonDetails): boolean {
  const selPokemon = selectedPokemon.value
  return (
    !!selPokemon &&
    !!pokemon &&
    !!selPokemon.details &&
    !!pokemon.details &&
    pokemon.details.id === selPokemon.details.id
  )
}

function updateFavorites(id: number) {
  favorites.value[id] = favorites.value[id] === undefined ? true : undefined
  saveFavorites(favorites.value)
}
</script>

<template>
  <div class="general-layout">
    <DataView
      dataKey=""
      class="dataview-main"
      lazy
      :totalRecords="pokemonList?.count"
      :value="pokemonDetails"
      :loading="loading"
      paginatorPosition="both"
      layout="grid"
      @page="onPage"
      :first="lazyParams.first"
      paginator
      :rows="lazyParams.rows"
    >
      <template #header>
        <h1>Pokemon</h1>
      </template>
      <template #grid="slotProps">
        <!-- prettier-ignore -->
        <div class="grid dataview-content" >
        <PokemonCard 
        @favored="updateFavorites" 
        :favored="favorites[pokemon.details.id] !== undefined" 
        @selected="updateSelection" :selected="isSelected(pokemon)" 
        class="col-12" 
        v-for="(pokemon) in (slotProps.items as PokemonDetails[])" 
        :pokemon="pokemon" :key="pokemon.details.id">
        </PokemonCard>
        </div>
      </template>
    </DataView>
    <DetailsPane
      v-if="detailedPokemon?.details !== undefined"
      :pokemon="detailedPokemon"
    ></DetailsPane>
  </div>
</template>

<style>
.dataview-content {
  display: flex;
  flex-flow: wrap;
}

.dataview-main {
  min-width: 15em;
  width: auto;
  padding: 1em;
  width: 58em;
  max-width: 60em;
  border-radius: 25px;
}

.general-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: none;
}
</style>
