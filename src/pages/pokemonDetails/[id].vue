<script setup lang="ts">
import { useRoute } from 'vue-router'
import { searchPokemon } from '../../composable/searchPokemon'
import { onMounted, onUpdated, ref } from 'vue'
import { Pokemon } from '../../helpers/PokeTypes'
import Carousel from 'primevue/carousel'
import router from '@/router'

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';



const route = useRoute()
const pokemonDetails = ref<Pokemon>()
const pokemonSprites = ref<string[]>([])
const id = ref(route.query.pokemon as unknown as number)

const abilities = ref<[ability: { name: string; url: string; }]>([])

const nextName = ref();
const next = ref()

onMounted(async () => {
  pokemonDetails.value = await searchPokemon(id.value)
  // console.log(typeof id)
  console.log(pokemonDetails?.value?.abilities)
  abilities.value = pokemonDetails?.value?.abilities!
  const pokemonSpriteObject = pokemonDetails.value?.sprites
  for (const key in pokemonSpriteObject) {
    if (pokemonSpriteObject[key] && key != 'other' && key != 'versions')
      pokemonSprites.value.push(pokemonSpriteObject[key])
  }
  next.value = await searchPokemon(String(Number(id.value) + 1))
  nextName.value = next.value.name
  console.log(next.value.name)
  // console.log(pokemonSprites.value)
  // console.log('mounted', id)
})

const goForward = () => {
  id.value++
  router.push({
    path: `/pokemonDetails/${nextName.value}`,
    query: { pokemon: +id.value.toString() }
  })
  router.go();
}

onUpdated(async () => {
  // pokemonDetails.value = await searchPokemon(id)
  console.log('updated');
  pokemonDetails.value = await searchPokemon(id.value)
  // console.log(typeof id)
  const pokemonSpriteObject = pokemonDetails.value?.sprites
  for (const key in pokemonSpriteObject) {
    if (pokemonSpriteObject[key] && key != 'other' && key != 'versions')
      pokemonSprites.value.push(pokemonSpriteObject[key])
  }
  // console.log(typeof id.value)
  next.value = await searchPokemon(String(Number(id.value) + 1))
  nextName.value = next.value.name
  console.log(next.value.name)
  // router.go();
  // location.reload()

})
</script>

<template>
  <div class="details-page">This is details</div>
  <div class="card">
    <Carousel :value="pokemonSprites" :numVisible="1" :numScroll="1">
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div class="mb-3">
            <img :src="slotProps.data" :alt="slotProps.data.name" class="w-6 shadow-2" />
          </div>
        </div>
      </template>
    </Carousel>
    <!-- {{ id }} -->
    <button>Back</button>
    <button @click="goForward">Next</button>
    <div class="card">
      <Accordion :activeIndex="-1">
        <AccordionTab header="Header I">
          <!-- <pre >{{abilities}}</pre> -->
          <p>Abilities: </p>
          <div v-for="ability in abilities" :key="ability.name">
            <p>{{ ability.ability.name }}</p>
          </div>
          <!-- <Card v-for="ability in abilities" :key="ability">
            <template #title>Ability:</template>
            <template #content><p>{{ ability }}</p></template>
          </Card> -->
        </AccordionTab>
        <AccordionTab header="Header II">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </AccordionTab>
      </Accordion>
    </div>

  </div>
  <router-view></router-view></template>

<style scoped>button {
  margin: 50px 0 10px 10px;
}</style>
