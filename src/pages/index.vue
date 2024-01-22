<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const api = 'https://pokeapi.co/api/v2/pokemon/'
const searchQuery = ref('')
const page_size = ref()
const results = ref([])
const sizeOption = ref([
  { name: '25', val: 25 },
  { name: '50', val: 50 },
  { name: '100', val: 100 },
  { name: 'ALL', val: 1302 }
])

const getPokemon = async () => {
  const res = await axios.get(api + searchQuery.value)
  results.value = res.data.results
}
</script>

<template>
  <section>
    <div class="header">
      <InputText type="text" v-model="searchQuery" placeholder="Enter Pokemon's Name or ID" />
      <Button @click="getPokemon">search</Button>

      <Dropdown
        v-model="page_size"
        :options="sizeOption"
        optionLabel="name"
        placeholder="Select a Size"
      >
      </Dropdown>
    </div>

    <div class="content"></div>
    <div v-for="res in results">
      {{ JSON.stringify(res) }}
    </div>

    <div class="footer">
      <Button> Previous </Button>
      <Button>Next</Button>
    </div>

    {{ page_size }}
  </section>
</template>

<style lang="scss"></style>
