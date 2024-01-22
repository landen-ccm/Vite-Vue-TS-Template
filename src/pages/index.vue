<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';


import { ref } from 'vue'

import 'primeicons/primeicons.css'
import axios from 'axios';

const searchParam = ref('');
const selectedNum = ref<string | number>();
const pageSizes = [
    25,
    50,
    100,
    'all'
]

const searchByName = async () => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchParam.value}`);
        if (data.name) {
            alert('success!')
        }
        console.log(data);
    } catch (error) {
        alert('No pokemon found with that name! Try again')
        throw error
    }

}


</script>

<template>
    <div class="card-container main-box">
        <div class="search-form p-card">
            <label for="username">Pokemon search</label>
            <InputText @keyup.enter="searchByName" v-model="searchParam" id="username" aria-describedby="username-help" />
            <small id="username-help">Enter the complete name of a pokemon please</small>
            <Button @click="searchByName">Search</Button>
        </div>
        <div class="dropdown p-card card">
            <!-- <h3>Pokemon display</h3> -->
            <Dropdown v-model="selectedNum" :options="pageSizes" placeholder="How many pokemon per page?" />
            <Button icon="pi pi-arrow-left" aria-label="Submit" />
            <Button icon="pi pi-arrow-right" aria-label="Submit" />
        </div>
    </div>
</template>

<style scoped>
.search-form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    gap: 2;
}

.main-box {
    display: flex;
    flex-direction: column;
}

</style>
