<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getPokemon, type Pokemon, type EnhancedPokemon } from '../../api.calls'
import { useRoute, useRouter } from 'vue-router'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import { FINAL_POKEMON_ID, POKEMON_SKIP_AT_ID, POKEMON_SKIP_TO_ID } from '@/helpers'
import Panel from 'primevue/panel'

const route = useRoute()
const router = useRouter()

const poke = ref<EnhancedPokemon | undefined>()
const numberId = ref(0)

const images = computed(() =>
  poke.value
    ? Object.entries(poke.value.sprites)
        .filter((keyVal) => typeof keyVal[1] === 'string')
        .map(([key, val]) => ({ name: key.split('_').join(' '), link: val }))
    : []
)

const handleClick = (typeOfClick: string) => {
  const id = route.params.id as string
  numberId.value = parseInt(id)

  if (typeOfClick === 'Next') {
    if (numberId.value === POKEMON_SKIP_AT_ID) {
      numberId.value = POKEMON_SKIP_TO_ID // ids skip from 1025 to 10001 so this handles that case
    } else if (numberId.value === FINAL_POKEMON_ID) {
      numberId.value = 1 // reset id back to one if on the last pokemon
    } else {
      numberId.value++
    }
  }

  if (typeOfClick === 'Prev') {
    if (numberId.value === POKEMON_SKIP_TO_ID) {
      numberId.value = POKEMON_SKIP_AT_ID // ids skip from 1025 to 10001 so this handles that case
    } else if (numberId.value === 1) {
      numberId.value += FINAL_POKEMON_ID - 1 // make id the last pokemon's id if we are on the first pokemon
    } else {
      numberId.value--
    }
  }

  const pokemonDetailName = '/pokemon/[id]'
  router.replace({ name: pokemonDetailName, params: { id: numberId.value } })
}

onMounted(async () => {
  try {
    const id = route.params.id
    if (typeof id === 'string') {
      const response = await getPokemon(id)
      console.log(response)
      poke.value = response[0] as EnhancedPokemon
      console.log(poke.value.abilities[0].ability.name)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="poke" class="container">
    <h1>#{{ poke.id }} - {{ poke.name.toUpperCase() }}</h1>
    <Carousel
      class="carousel"
      :value="images"
      :numVisible="3"
      :numScroll="1"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="carousel-card">
          <img :src="slotProps.data.link" :alt="slotProps.data.name" />
          <h1>
            {{ slotProps.data.name.toUpperCase() }}
          </h1>
        </div>
      </template>
    </Carousel>
    <Panel header="Abilities and Type(s)" toggleable class="panel">
      <div class="panel-content">
        <div>
          <h2>Types:</h2>
          <p v-for="pokemonType in poke.pokemonTypes" :key="pokemonType.slot">
            {{ pokemonType.type.name.toUpperCase() }}
          </p>
        </div>
        <div>
          <h2>Abilities:</h2>
          <p v-for="pokemonAbility in poke.abilities" :key="pokemonAbility.slot">
            {{ pokemonAbility.ability.name.toUpperCase() }}
          </p>
        </div>
      </div>
    </Panel>
    <div class="btn-div">
      <Button @click="handleClick('Prev')">Prev</Button>
      <Button @click="handleClick('Next')">Next</Button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  width: 100%;
}
.panel-content {
  display: flex;
  gap: 2rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  font-size: 20px;
  font-weight: 700;
}
img {
  width: 200px;
}
.carousel {
  padding: 10px;
}
.carousel-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.btn-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
