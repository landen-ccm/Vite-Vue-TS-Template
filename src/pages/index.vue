<script setup lang="ts">
import { BASE_API_URL } from '@/main'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

type PaginationOptionsType = '25' | '50' | '100' | 'All'
const paginationOptions: PaginationOptionsType[] = ['25', '50', '100', 'All']

const searchTerm = ref('')
const paginationSelection = ref<PaginationOptionsType>()

async function getPokemonByName(name: string) {
  try {
    const response = await axios.get(`${BASE_API_URL}/${name.toLowerCase()}`)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="getPokemonByName(searchTerm)" class="p-input-icon-left">
      <i class="pi pi-search" @click="getPokemonByName(searchTerm)" />
      <InputText
        class="search-bar"
        size="large"
        type="text"
        placeholder="Find a Pokémon"
        v-model.trim="searchTerm"
      />
    </form>
    <Dropdown
      v-model="paginationSelection"
      :options="paginationOptions"
      placeholder="Per Page"
      class="w-full md:w-14rem"
    />
  </div>
  <div>
    <Button label="Previous" />
    <Button label="Next" />
  </div>
</template>

<style lang="scss"></style>
