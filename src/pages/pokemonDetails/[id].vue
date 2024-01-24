<script setup lang="ts">
import { useRoute } from 'vue-router'
import { searchPokemon } from '../../composable/searchPokemon'
import { onMounted, ref } from 'vue'
import { PokeAbility, Pokemon } from '../../helpers/PokeTypes'
import Carousel from 'primevue/carousel'
import router from '../../router' // Can't use @, needs to be path

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const route = useRoute()
const pokemonDetails = ref<Pokemon>()
const pokemonSprites = ref<string[]>([])
const id = ref(route.query.pokemon as unknown as number)

const abilities = ref<PokeAbility[]>([])
const types = ref()

const nextName = ref()
const next = ref()

const initialCall = async () => {
  pokemonSprites.value = []
  console.log('id', id.value)
  // console.log()
  pokemonDetails.value = await searchPokemon(id.value.toString())
  // console.log(typeof id)
  console.log(pokemonDetails?.value)
  abilities.value = pokemonDetails?.value?.abilities!
  types.value = pokemonDetails.value?.types
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
}

onMounted(async () => {
  await initialCall()
})

const goForward = async () => {
  if (id.value === 10276) {
    id.value = 1
  } else {
    id.value++
  }
  router.replace({
    path: `/pokemonDetails/${nextName.value}`,
    query: { pokemon: +id.value.toString() }
  })
  await initialCall()
  // updateView()
  // router.go();
}

const goBack = async () => {
  if (id.value === 1) {
    id.value = 10276
  } else {
    id.value--
  }
  router.replace({
    path: `/pokemonDetails/${nextName.value}`,
    query: { pokemon: +id.value.toString() }
  })
  await initialCall()
}
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
    <button @click="goBack">Back</button>
    <button @click="goForward">Next</button>
    <div class="card">
      <Accordion :activeIndex="-1">
        <AccordionTab header="Abilities">
          <!-- <pre >{{abilities}}</pre> -->
          <div v-for="ability in abilities" :key="ability.ability.name">
            <p>{{ ability.ability.name }}</p>
          </div>
          <!-- <Card v-for="ability in abilities" :key="ability">
            <template #title>Ability:</template>
            <template #content><p>{{ ability }}</p></template>
          </Card> -->
        </AccordionTab>
        <AccordionTab header="Types">
          <div v-for="type in types" :key="type.name">
            <p>{{ type.type.name }}</p>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
button {
  margin: 50px 0 10px 10px;
}
</style>
