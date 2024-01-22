<template>
<div>

  <input v-model="searchQuery" placeholder="Search Pokemon" />
    <button @click="searchButtonClicked = true">Search</button>
    <div>
      <Dropdown v-model="pageSize" :options="pageSizeOptions"/>
    </div>
    <div>
      <ul>
        <li v-for="poke in pokemon" :key="poke.name">
          {{ poke.name }}
        </li>
      </ul>
    </div>
    <button> Next</button>
    <button> previous</button>
    </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import Dropdown from 'primevue/dropdown';
const searchQuery = ref('');
const searchButtonClicked = ref(false);
const pageSize = ref<number | null>(25);
const pageSizeOptions = [25, 50, 100, 'all'];

 onMounted(async () => {
  await fetchdata(); 
  });


  interface Pokemon {
  name: string;
  url: string;
}

const pokemon = ref<Pokemon[]>([]);

  //fetching data
const fetchdata = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    pokemon.value = data.results;
  } catch (error) {
    console.error('Error fetching', error);
  }
};

</script>