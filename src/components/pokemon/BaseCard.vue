
import type { log } from 'console';

import type { mergeProps } from 'vue';

import type { log } from 'console';
<script setup lang="ts">
import Card from 'primevue/card'
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Button from 'primevue/button'


defineProps(['pokemon'])

const toast = useToast();

const showAddToFavorites = (message: string, severity: 'success' | 'error') => {
    toast.add({ severity: severity, detail: message, life: 3000 });
};

// const addToFavorites = (name: string) => {
//     if (favoritePokemon.value.includes(name)) {
//         const itemIdx = favoritePokemon.value.indexOf(name)
//         favoritePokemon.value.splice(itemIdx, 1);
//         showAddToFavorites(`${name} removed from favorites`, 'error');
//     } else {
//         favoritePokemon.value.push(name);
//         showAddToFavorites(`${name} added to favorites!`, 'success')
//     }
//     // console.log(favoritePokemon.value)
// }

onMounted(() => {
    console.log('hello')
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
            <template #content><Button>View Details</Button></template>
            <template #footer>
                <div>
                    <Toast />
                    <!-- <Button @click="addToFavorites(pokemon.name)">
                        <i :class="favoritePokemon.includes(pokemon.name) ? 'pi pi-heart-fill' : 'pi pi-heart'"></i>
                    </Button> -->
                </div>
            </template>
        </Card>
    </div>
</template>