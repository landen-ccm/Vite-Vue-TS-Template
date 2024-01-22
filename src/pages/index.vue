<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import getPokemon from '../api.calls'

const searchQuery = ref('')
const pokemon = ref()
type size = 25 | 50 | 100 | 'All'
const dropdownSizes: size[] = [25, 50, 100, 'All']
const selectedSize = ref<size>(25)

async function searchHandler() {
  pokemon.value = await getPokemon(searchQuery.value)
}

onMounted(async () => {
  pokemon.value = await getPokemon(searchQuery.value)
})
</script>

<template>
  <div>
    <i class="pi pi-check"></i>
    <InputText
      @keyup.enter="searchHandler"
      v-model="searchQuery"
      placeholder="enter a Pokemon name or id"
      size="normal"
    ></InputText>
    <Button @click="searchHandler">search</Button>
  </div>
  <Dropdown :options="dropdownSizes" v-model="selectedSize"></Dropdown>
  <div>
    {{ pokemon }}
  </div>
  <Button>Previous</Button><Button>Next</Button>
</template>
