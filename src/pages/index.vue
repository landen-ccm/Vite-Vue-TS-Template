<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useToast } from 'primevue/usetoast'

import SearchBox from '@/components/search/SearchBox.vue'

import { ref } from 'vue'

import 'primeicons/primeicons.css'
import { getListOfPokemon, searchByName, type PokemonListElement } from '@/helpers/apiCalls'
import type { PokeCard, PokemonInfo } from '@/helpers/shared'
import axios from 'axios'

const toast = useToast()

const selectedNum = ref<string | number>(25)
const pageSizes = [25, 50, 100, 'all']

const currentPageSize = ref<string | number>(25)
const pokemonList = ref<PokeCard[]>([])

const currentPage = ref(0)

const itemsPerPage = computed((): number =>
  typeof currentPageSize.value === 'number' ? currentPageSize.value : 100000
)

const displayError = (details: string, summary = 'Error') => {
  toast.add({ severity: 'error', summary: summary, detail: details })
}

const fetchCards = async () => {
  try {
    const temp = await getListOfPokemon(itemsPerPage.value, currentPage.value)!

    if (temp === null || typeof temp?.results === 'undefined') {
      console.log("Couldn't fetch, dying quietly...")
      return
    }
    pokemonList.value.length = 0
    for (const poke of temp.results) {
      const { data } = await axios.get<PokemonInfo>(poke.url)

      pokemonList.value.push({
        name: data.name,
        imageUrl: data.sprites.front_default,
        id: data.id
      })
    }
  } catch (error) {
    console.log(error)
  }
}

async function onSubmit(name: string) {
  try {
    const data = await searchByName(name)
    console.log(data)
    if (!data) {
      alert(`Couldn't find '${name}'`)
    } else {
      pokemonList.value.length = 0
      pokemonList.value.push({
        name: data.name,
        imageUrl: data.sprites.front_default,
        id: data.id
      })
    }
  } catch (error) {
    alert(`Couldn't find '${name}'`)
  }
}

onMounted(() => fetchCards())
</script>

<template>
  <div class="card-container main-box">
    <search-box @submit="onSubmit" class="card"></search-box>
    <div id="poke-list" class="poke-list">
      <PokemonCard
        v-for="poke in pokemonList"
        :key="poke.id"
        :id="poke.id"
        :name="poke.name"
        :image-url="poke.imageUrl"
      />
    </div>
    <div class="dropdown p-card card flex">
      <Dropdown v-model="selectedNum" :options="pageSizes" />
      <Button icon="pi pi-arrow-left" aria-label="Submit" />
      <Button icon="pi pi-arrow-right" aria-label="Submit" />
    </div>
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
}

.poke-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>
