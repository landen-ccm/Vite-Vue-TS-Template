<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

import { watch, ref, inject, computed } from 'vue'
import CardList from './CardList.vue'
import Favorites from './Favorites.vue'
import { getPokemon, getEnhancedPokemon } from '@/api.calls'
const pokemonData = ref()
const paginationOptions = ['25', '50', '100', 'All']
const selectedPagination = inject('pageSize')
const pageNumber = inject('pageNumber')
const searchParam = ref('')
const showList = ref(false)
const showFavorites = ref(false)
type PokemonData = {
  name: string
  url: string
}

type EnhancePokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

const offset = computed(() => {
  return (
    pageNumber * (selectedPagination.value === 'All' ? 1032 : parseInt(selectedPagination.value))
  )
})

const handleNext = async () => {
  pageNumber.value += 1
  const data = await getPokemon(selectedPagination.value, pageNumber.value)
  pokemonData.value = data.results
}

const handlePrevious = async () => {
  pageNumber.value -= 1
  const data = await getPokemon(selectedPagination.value, pageNumber.value)
  pokemonData.value = data.results
}

const search = async () => {
  if (searchParam.value == '') {
    const data = await getPokemon(selectedPagination.value, pageNumber.value)
    pokemonData.value = data.results
  } else {
    pokemonData.value = await getEnhancedPokemon(searchParam.value)
  }
}
onMounted(async () => {
  const data = await getPokemon(selectedPagination.value, pageNumber.value)
  pokemonData.value = data.results
})

watch(selectedPagination, async () => {
  const data = await getPokemon(selectedPagination.value, pageNumber.value)
  pokemonData.value = data.results
})
</script>
<template class="search-form">
  <div v-show="!showFavorites">
    <span class="p-float-label">
      <InputText id="search" v-model="searchParam" />
      <label for="search">Search</label>
    </span>

    <Button label="Submit" @click="search" />
    <Dropdown
      v-model="selectedPagination"
      :options="paginationOptions"
      class="w-full md:w-14rem dropdown"
    />
  </div>
  <Button @click="showFavorites = !showFavorites">View Favorites</Button>

  <CardList v-if="!showFavorites" :pokemon-data="pokemonData"></CardList>
  <Favorites v-if="showFavorites" :pokemon-data="pokemonData"></Favorites>

  <div class="btn-div">
    <Button @click="handlePrevious" label="Previous" :disabled="pageNumber === 1" />
    {{ pageNumber }}
    <Button @click="handleNext" label="Next" />
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 10rem;
}
</style>
