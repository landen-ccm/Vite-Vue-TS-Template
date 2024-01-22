<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import searchFormApi from '../api/searchFormApi'
import {
  pokemonData,
  paginationOptions,
  selectedPagination,
  searchParam
} from '../helpers/searchFormHelpers'

const search = async () => {
  if (searchParam.value) {
    pokemonData.value = await searchFormApi.getPokemon(searchParam.value)
  }
}
</script>
<template class="search-form">
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
../api/searchFormApi ../helpers/searchForm ../helpers/searchFormHelpers
