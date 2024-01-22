<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css'
import axios from 'axios'

type displaydata = {
  count: number
  next: string
  previous: string
  results: {
    name: string
    url: string
  }[]
}

const searchParam = ref('')
const pageSize = ref('')
const pageSizes = ['25', '50', '100', 'all']
const displayData = ref<displaydata>()

const searchButtonHandler = async () => {
  //doSomething
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${searchParam.value}`)
  const searchRes = response.data
  console.log(searchRes)
}

onMounted(async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20')
  displayData.value = response.data
})
</script>
<template>
  <InputText type="text" v-model="searchParam" @keyup.enter="searchButtonHandler" />
  <Button @click="searchButtonHandler">Search</Button>

  <div class="card flex justify-content-center">
    <Dropdown v-model="pageSize" :options="pageSizes" placeholder="25" class="w-full md:w-14rem" />
  </div>

  <div>
    <ul>
      <li v-for="pokemon in displayData?.results" :key="pokemon.name">{{ pokemon.name }}</li>
    </ul>
  </div>

  <div>
    <Button><i class="pi-angle-double-left">Prev</i></Button>
    <Button><i class="pi-angle-double-right">Next</i></Button>
  </div>
</template>
