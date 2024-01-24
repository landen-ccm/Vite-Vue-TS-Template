<script setup lang="ts">
import { ref } from 'vue'
import { getPokemon, getPokemonList } from '../api.calls'
import type { Pokemon } from '../api.calls'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import PokemonResults from './PokemonResults.vue'
import { pageSize, sizeOption, MAX_POKEMON, pageNumber } from '@/helpers'

const props = defineProps<{
  favorites: Set<number>
}>()

const isLoading = ref(true)

const searchQuery = ref('')
const pokemonList = ref<Pokemon[]>([])
const addAllToFavorites = inject<(pokemonArr: Pokemon[]) => void>('addAllToFavorites', () => {})
watch([pageNumber, pageSize], async () => await fetchPokemon())

async function fetchPokemon() {
  isLoading.value = true
  if (searchQuery.value == '') {
    pokemonList.value = await getPokemonList(pageSize.value.val, pageNumber.value)
  } else {
    pokemonList.value = await getPokemon(searchQuery.value)
  }
  isLoading.value = false
}

onMounted(async () => {
  pokemonList.value = await getPokemonList(pageSize.value.val, pageNumber.value)
  isLoading.value = false
})
</script>

<template>
  <div class="header">
    <div>
      <InputText
        class="search-bar"
        @keyup.enter="fetchPokemon"
        type="text"
        v-model.trim="searchQuery"
        placeholder="Enter Pokemon's Name or ID"
      />
      <Button @click="fetchPokemon">Search</Button>
    </div>

    <Dropdown
      v-model="pageSize"
      :options="sizeOption"
      optionLabel="name"
      placeholder="Select a Size"
    >
    </Dropdown>
  </div>

  <LoadingSpinner data-test="loading" v-if="isLoading" />
  <PokemonResults v-else :pokemonList="pokemonList" :favorites="props.favorites" />

  <div class="pagination-container">
    <Button :disabled="pageNumber === 1 || pokemonList.length <= 1" @click="pageNumber--"
      >Previous</Button
    >
    <Button
      @click="addAllToFavorites(pokemonList)"
      v-if="pageSize.val !== MAX_POKEMON && pokemonList.length > 0"
      >Add All to Favorites</Button
    >
    <Button
      :disabled="pageNumber * pageSize.val >= MAX_POKEMON || pokemonList.length <= 1"
      @click="pageNumber++"
      >Next</Button
    >
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.search-bar {
  width: 450px;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
}
</style>
