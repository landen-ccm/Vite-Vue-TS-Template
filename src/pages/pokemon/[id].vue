<script setup lang="ts">
import { fetchAllPokemon, fetchOnePokemon } from '../../helpers/homePageHelper'

import { onMounted, ref } from 'vue'
import router from '@/router'

import axios from 'axios'

import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Carousel from 'primevue/carousel'
import Card from 'primevue/card'
import Listbox from 'primevue/listbox'

const pokemonData = ref()
const dataIsLoaded = ref(false)

// type pokemonImageNames = {

// }
const pokemonImages = ref<string[]>([])
const pokeId = ref<number>(+router.currentRoute._value.params.id)
const pokeList = ref()

const pullData = async () => {
  pokeList.value = await fetchAllPokemon({ limit: 'all' })
  console.dir(pokeList.value)
  const response = await axios.get(pokeList.value.results[pokeId.value - 1].url)
  const data = response.data
  console.dir(data)
  pokemonData.value = data
  dataIsLoaded.value = true
  pokemonImages.value = []
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
}

onMounted(async () => {
  pullData()
  // console.log(router.currentRoute._value.params.id)
  // console.log(data.sprites['back_default']);

  console.log(pokemonImages.value)
})

const wrapToValid = (id: number) => {
  return ((id - 1 + pokeList.value.results.length) % pokeList.value.results.length) + 1
}

const previousPokemon = () => {
  const previous = wrapToValid(+pokeId.value - 1)
  pokeId.value = previous
  router.push({ name: '/pokemon/[id]', params: { id: previous }, replace: true })
  pullData()
}

const nextPokemon = () => {
  const next = wrapToValid(+pokeId.value + 1)
  pokeId.value = next
  router.push({ name: '/pokemon/[id]', params: { id: next }, replace: true })
  pullData()
}

const abilities = computed(() => {
  const outAbilities = []
  for (const ability of pokemonData.value.abilities) {
    outAbilities.push({ name: ability.ability.name, url: ability.ability.url })
  }
  return outAbilities
})

const pokeTypes = computed(() => {
  const pokeTypes = []
  for (const type of pokemonData.value.types) {
    pokeTypes.push({ name: type.type.name, url: type.type.url })
  }
  return pokeTypes
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
        <template #item="image">
          <div
            v-if="image.data"
            class="border-1 surface-border border-round m-2 text-center py-5 px-3"
          >
            <div class="mb-3">
              <img :src="image.data" class="w-6 shadow-2" />
            </div>
          </div>
        </template>
      </Carousel>
      <Accordion>
        <AccordionTab>
          <template #header>More</template>
          <template #default>
            <div style="display: flex; flex-flow: row; justify-content: center">
              <Card style="margin-right: 10px">
                <template #title> Abilities </template>
                <template #content>
                  <Listbox
                    :options="abilities"
                    optionLabel="name"
                    optionValue="name"
                    :disabled="true"
                  >
                  </Listbox>
                </template>
              </Card>
              <Card>
                <template #title> Types </template>
                <template #content>
                  <Listbox
                    :options="pokeTypes"
                    optionLabel="name"
                    optionValue="name"
                    :disabled="true"
                  >
                  </Listbox>
                </template>
              </Card>
            </div>
          </template>
        </AccordionTab>
      </Accordion>
      <!-- <img :src="pokemonImages[0]" alt="This is the image"> -->
      <Button @click="previousPokemon">Previous</Button>
      <Button @click="router.go(-1)">Back</Button>
      <Button @click="nextPokemon">Next</Button>
    </div>
  </div>
</template>

<style>
button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
