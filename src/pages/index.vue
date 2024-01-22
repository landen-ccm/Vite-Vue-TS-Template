<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { ref } from 'vue'

import 'primeicons/primeicons.css'
import axios from 'axios';

const searchParam = ref('');

const getData = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    console.log(data);
}


</script>

<template>
    <h2>hello</h2>
    <div>
        <i class="pi pi-check"></i>
        <i class="pi pi-times"></i>
        <span class="pi pi-search"></span>
        <span class="pi pi-user"></span>
    </div>
    <div class="search-form">
        <label for="username">Pokemon search</label>
        <InputText v-model="searchParam" id="username" aria-describedby="username-help" />
        <small id="username-help">Enter the complete name of a pokemon please</small>
        <Button @click="getData">Search</Button>
    </div>
</template>

<style scoped>
.search-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    gap: 2;
}
</style>
