<script setup lang="ts">
import { fetchOnePokemon } from '../../helpers/homePageHelper'
import { onMounted, ref } from 'vue'
import router from '@/router';


import Carousel from 'primevue/carousel';



const pokemonData = ref()
const dataIsLoaded = ref(false)

// type pokemonImageNames = {

// }

const pokemonImages = ref<string[]>([])

onMounted(async () => {
    // console.log(router.currentRoute._value.params.id)
    const pokemonName = router.currentRoute._value.params.id;
    const data = await fetchOnePokemon(pokemonName)
    pokemonData.value = data;
    console.log(data.sprites)
    dataIsLoaded.value = true
    if (data.sprites['back_default']) {
        pokemonImages.value.push(data.sprites['back_default'])
    }
    if (data.sprites['back_female']) {
        pokemonImages.value.push(data.sprites['back_female'])
    }
    if (data.sprites['back_shiny']) {
        pokemonImages.value.push(data.sprites['back_shiny'])
    }
    if (data.sprites['back_shiny_default']) {
        pokemonImages.value.push(data.sprites['back_shiny_default'])
    }
    if (data.sprites['front_default']) {
        pokemonImages.value.push(data.sprites['front_default'])
    }
    if (data.sprites['front_female']) {
        pokemonImages.value.push(data.sprites['front_female'])
    }
    if (data.sprites['front_shiny']) {
        pokemonImages.value.push(data.sprites['front_shiny'])
    }
    if (data.sprites['front_shiny_female']) {
        pokemonImages.value.push(data.sprites['front_shiny_female'])
    }
    // console.log(data.sprites['back_default']);

    console.log(pokemonImages.value)
})



</script>

<template>
    <div v-if="dataIsLoaded">
        <h2>{{ pokemonData.name }}</h2>
        <!-- <pre style="color: black;">
                    {{ pokemonImages['back_default'] }}
                </pre> -->

        <div class="card" style="bac">
            <Carousel :value="pokemonImages" :numVisible="3" :numScroll="1">
                    <template #item="image" >
                        <div v-if="image.data" class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                            <div class="mb-3">
                                <img :src="image.data" class="w-6 shadow-2" />
                            </div>
                        </div>
                    </template>
                </Carousel>
            <!-- <img :src="pokemonImages[0]" alt="This is the image"> -->

        </div>

    </div>
</template>