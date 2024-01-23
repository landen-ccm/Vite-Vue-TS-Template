<script setup lang="ts">
import Button from 'primevue/button'
import Image from 'primevue/image'
import { getPokemonByNameOrId } from '../../api.calls'
import { onMounted, ref } from 'vue'
import { type SinglePokemonResponse } from '../../models/pokedex'
import { useRoute, useRouter } from 'vue-router'
import FINAL_POKEMON_ID from '../../pages/index.vue'
import Panel from 'primevue/panel'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

const router = useRouter()
const route = useRoute()
const pokemonDetails = ref<SinglePokemonResponse>({
  id: 0,
  name: '',
  sprites: {
    front_default: '',
    front_female: '',
    front_shiny: '',
    front_shiny_female: '',
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: ''
  }
})
const imageCarousel = [
  'front_default',
  'front_female',
  'front_shiny',
  'front_shiny_female',
  'back_default',
  'back_female',
  'back_shiny',
  'back_shiny_female'
]

const imageCounter = ref(0)
const handleClick = (typeOfClick: string) => {
  if (typeOfClick === 'Next') {
    if (imageCounter.value === imageCarousel.length - 1) {
      imageCounter.value = 0
      return
    }
    imageCounter.value++
  } else {
    if (imageCounter.value === 0) {
      imageCounter.value = imageCarousel.length - 1
      return
    }
    imageCounter.value--
  }
}

const switchPokemon = async (typeOfClick: string) => {
  if (typeOfClick === 'Next') {
    console.log(route.params.id)
    if (route.params.id === FINAL_POKEMON_ID) return
    router.push(`/details/${parseInt(route.params.id) + 1}`)
  } else {
    if (route.params.id === '1') return
    router.push(`/details/${parseInt(route.params.id) - 1}`)
  }
  const response = await getPokemonByNameOrId(route.params.id.toString())
  pokemonDetails.value = response?.data as SinglePokemonResponse
}

const back = () => {
  router.replace('/')
}

onMounted(async () => {
  const response = await getPokemonByNameOrId(route.params.id.toString())
  pokemonDetails.value = response?.data as SinglePokemonResponse
})
</script>
<template>
  <div class="p-card">
    <div v-if="pokemonDetails">
      <Button @click="back">Back to List</Button>
      <h2>Pokemon Name: {{ pokemonDetails.name.toUpperCase() }}</h2>
      <h3>Pokemon Id: {{ pokemonDetails.id }}</h3>
      <Image
        v-if="pokemonDetails.sprites[imageCarousel[imageCounter]]"
        :src="pokemonDetails.sprites[imageCarousel[imageCounter]]"
        width="400"
      />
      <div v-else>
        <Image src="https://placehold.co/600x400?text=No+Image+found" />
      </div>
    </div>
    <div class="btn-div">
      <Button @click="handleClick('Prev')">Prev</Button>
      <Button @click="handleClick('Next')">Next</Button>
    </div>
    <div class="btn-div">
      <Button @click="switchPokemon('Prev')">Prev Pokemon</Button>
      <Button @click="switchPokemon('Next')">Next Pokemon</Button>
    </div>
  </div>
  <Panel header="MORE" toggleable>
    <div>
      <Accordion :multiple="true" :activeIndex="[0]">
        <AccordionTab header="Abilities">
          <ul v-for="ability in pokemonDetails.abilities">
            <ol>
              {{
                ability.ability.name
              }}
            </ol>
          </ul>
        </AccordionTab>
        <AccordionTab header="Types">
          <ul v-for="t in pokemonDetails.types">
            <ol>
              {{
                t.type.name
              }}
            </ol>
          </ul>
          
        </AccordionTab>
      </Accordion>
    </div>
  </Panel>
</template>
<style scoped>
.p-card {
  border: 1px solid #c8ced3;

  border-radius: 4px;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-height: 800px;
  justify-content: center;
  text-align: center;
}

.p-card h2 {
  font-size: 3rem;
}

.btn-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
