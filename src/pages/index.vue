<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import 'primeicons/primeicons.css'
import { searchParam, pageSize, pageSizes, displayData } from './variables'
import { searchButtonHandler, getData } from '@/helpers/homepageHelpers'

onMounted(async () => {
  // console.log(pageSize.value)
  displayData.value = await getData(pageSize.value)
})
</script>
<template>
  <div>
    <InputText type="text" v-model="searchParam" @keyup.enter="searchButtonHandler(searchParam)" />
    <Button @click="searchButtonHandler(searchParam)">Search</Button>
  </div>

  <div class="card flex justify-content-center">
    <Dropdown v-model="pageSize" :options="pageSizes" placeholder="Page size" />
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
