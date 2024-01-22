<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import PokemonCard from '../components/PokemonCard.vue'
import { getPokemon, getPokemonList } from '../api.calls'
import type { Pokemon } from '../api.calls'
const searchQuery = ref('')
const pageSize = ref()
const pokemonList = ref<Pokemon[]>([])
const pokemonError = ref(false)
const pageNumber = ref(1)
const sizeOption = ref([
  { name: '25', val: 25 },
  { name: '50', val: 50 },
  { name: '100', val: 100 },
  { name: 'ALL', val: 1302 }
])

async function clickHandler() {
  if (searchQuery.value == '') {
    pokemonList.value = await getPokemonList()
    if (pokemonList.value.length > 0) {
      pokemonError.value = false
    } else {
      pokemonError.value = true
    }
  } else {
    pokemonList.value = await getPokemon(searchQuery.value)
    if (pokemonList.value.length > 0) {
      pokemonError.value = false
    } else {
      pokemonError.value = true
    }
  }
}

onMounted(async () => {
  pokemonList.value = await getPokemonList()
  if (pokemonList.value.length > 0) {
    pokemonError.value = false
  } else {
    pokemonError.value = true
  }
})
</script>

<template>
  <section>
    <div class="header">
      <InputText type="text" v-model.trim="searchQuery" placeholder="Enter Pokemon's Name or ID" />
      <Button @click="clickHandler">search</Button>

      <Dropdown
        v-model="pageSize"
        :options="sizeOption"
        optionLabel="name"
        placeholder="Select a Size"
      >
      </Dropdown>
    </div>

    <div class="content" v-if="!pokemonError">
      <PokemonCard v-for="card in pokemonList" :key="card.id" :pokemon="card">hello</PokemonCard>
    </div>
    <div class="error" v-else>
      <p>Error: no pokemon found</p>
    </div>
    <div class="footer">
      <Button> Previous </Button>
      <Button>Next</Button>
    </div>

    {{ pageSize }}
  </section>
</template>

<style lang="scss">
.error {
  color: red;
}
</style>
