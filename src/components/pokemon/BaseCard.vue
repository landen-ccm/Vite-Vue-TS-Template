
<script setup lang="ts">
import Card from 'primevue/card'

import Toast from 'primevue/toast';

import Button from 'primevue/button'
import router from '@/router'



defineProps(['pokemon', 'addToFavorites', 'favoritePokemon'])




onMounted(() => {
    // console.log('hello')
})
</script>

<template>
    <div>
        <Card style="width: 12em; margin-bottom: 10px">
            <p>Hello</p>
            <template #header>
                <h1>{{ pokemon.name }}</h1>
            </template>
            <template #title>
                <img alt="user header"
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`" />
            </template>
            <template #subtitle> {{ pokemon.url.split('/')[6] }} </template>
            <template><Button @click="console.log(router.getRoutes())">See routes</Button></template>
            <template #content ><Button @click="router.push({name: '/pokemon/[id]', params: {id: pokemon.name}})">View Details</Button></template>
            <template #footer>
                <div>
                    <Toast />
                    <Button @click="addToFavorites(pokemon.name)">
                        <i :class="favoritePokemon.includes(pokemon.name) ? 'pi pi-heart-fill' : 'pi pi-heart'"></i>
                    </Button>
                </div>
            </template>
        </Card>
    </div>
</template>