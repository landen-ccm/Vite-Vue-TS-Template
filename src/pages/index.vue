<script setup lang="ts">
import Button from 'primevue/button';
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
      <search-box class="card"></search-box>
        <div class="dropdown p-card card flex">
            <Dropdown v-model="selectedNum" :options="pageSizes" placeholder="How many pokemon per page?" />
            <Button icon="pi pi-arrow-left" aria-label="Submit" />
            <Button icon="pi pi-arrow-right" aria-label="Submit" />
        </div>
    </div>
</template>

<style scoped>

.main-box {
    display: flex;
    flex-direction: column;
}

</style>
