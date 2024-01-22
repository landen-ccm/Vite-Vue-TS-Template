<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import SearchBox from '@/components/search/SearchBox.vue';


import { ref } from 'vue'

import 'primeicons/primeicons.css'

const selectedNum = ref<string | number>();
const pageSizes = [
    25,
    50,
    100,
    'all'
]




</script>

<template>
    <div class="card-container main-box">
      <search-box></search-box>
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
