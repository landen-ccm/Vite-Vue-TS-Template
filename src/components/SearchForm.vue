<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import axios from 'axios'
import { watch, ref } from 'vue'
import CardList from './CardList.vue'

const pokemonData = ref()
const paginationOptions = ['25', '50', '100', 'All']
const selectedPagination = ref('25')
const searchParam = ref('')
const pokemonEnhancedData = ref()
const previous = ref()
const next = ref()
const offset = ref(0)
const showList = ref(false)
const showEnhanced = ref(false)

type PokemonData = {
  name: string
  url: string
}

type EnhancePokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

const getEnhancedPokemon = async (id: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return data
}

const getPokemon = async () => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=${selectedPagination.value}`
  )
  return data
}

const handleNext = async () => {
  const { data } = await axios.get(next.value)
  offset.value += selectedPagination.value === 'All' ? parseInt(selectedPagination.value) : 1302
  pokemonData.value = data.results
  previous.value = data.previous
  next.value = data.next
}

const handlePrevious = async () => {
  const { data } = await axios.get(previous.value)
  offset.value -= selectedPagination.value === 'All' ? parseInt(selectedPagination.value) : 1302
  pokemonData.value = data.results
  previous.value = data.previous
  next.value = data.next
}

const search = async () => {
  if (searchParam.value == '') {
    offset.value = 0
    const data = await getPokemon()
    pokemonData.value = data.results
    previous.value = data.previous
    next.value = data.next
    showList.value = true
    showEnhanced.value = false
  } else {
    pokemonEnhancedData.value = await getEnhancedPokemon(searchParam.value)
    showList.value = false
    console.log(pokemonEnhancedData.value)
    showEnhanced.value = true
  }
}

watch(selectedPagination, async () => {
  await search()
})
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
  <CardList v-if="showList" :pokemon-data="pokemonData" :offset="offset"></CardList>

  <Card v-if="showEnhanced">
    <template #name>{{ pokemonEnhancedData.name }}</template>
    <template #_id>{{ pokemonEnhancedData.id }}</template>
    <template #img
      ><img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonEnhancedData.id + offset + 1}.png`"
      />
    </template>
  </Card>

  <div class="btn-div">
    <Button @click="handlePrevious" label="Previous" />
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
