<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import axios from 'axios'
import { ref } from 'vue'

const pokemonData = ref()
const paginationOptions = ['25', '50', '100', 'All']
const selectedPagination = ref('')
const searchParam = ref('')

const getPokemon = async (id: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  console.log(data)
  return data
}

const search = async () => {
  if (searchParam.value) {
    pokemonData.value = await getPokemon(searchParam.value)
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
