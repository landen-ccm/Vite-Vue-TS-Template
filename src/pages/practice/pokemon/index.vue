<script setup lang="ts">
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'

const searchInput = ref('')
const offset = ref(0)
const limit = ref(25)

const pokemon = ref(null)
const isLoading = ref(false)

const getPokemon = async () => {
  isLoading.value = true

  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchInput.value ? searchInput.value + '/' : ''}?limit=${limit.value}&offset=${offset.value}`
    )
    if (data.results) pokemon.value = data.results
    else pokemon.value = [data]
  } catch (error) {
    console.log(error)
    window.alert(error)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(async () => {
  await getPokemon()
})
</script>

<template>
  <h1>Pokemon Activity</h1>

  <LoadingSpinner v-if="isLoading" />

  <SearchWithSubmit @submit="getPokemon()" v-model="searchInput" class="mt-6" />

  <pre>{{ pokemon }}</pre>
</template>
