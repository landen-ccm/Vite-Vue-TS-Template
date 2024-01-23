<script setup lang="ts">
import { fetchOnePokemon } from '../../helpers/homePageHelper'
import { onMounted, ref } from 'vue'

const pokemonData = ref()

onMounted(() => {
    const data = fetchOnePokemon('pikachu');
    console.log(data);
})
</script>

<template>
    <div>
        <h2>This is a single pokemon page</h2>
    </div>
</template>