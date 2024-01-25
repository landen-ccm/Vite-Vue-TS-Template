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
const images = computed(() => {
  const imageKeys: (keyof Pokemon['sprites'])[] = [
    'front_default',
    'back_default',
    'front_shiny',
    'back_shiny',
    'front_female',
    'back_female',
    'front_shiny_female',
    'back_shiny_female'
  ]
  return poke.value
    ? imageKeys
        .filter((key) => typeof poke.value?.sprites[key] === 'string')
        .map((key) => ({ name: key.split('_').join(' '), link: poke.value?.sprites[key] }))
    : []
})

const pokemonId = computed(() => {
  if (typeof route.params.id === 'string') {
    return parseInt(route.params.id)
  } else {
    return parseInt(route.params.id[0])
  }
})

const nextId = computed(() => {
  return pokemonId.value === POKEMON_SKIP_AT_ID
    ? POKEMON_SKIP_TO_ID
    : pokemonId.value === FINAL_POKEMON_ID
      ? 1
      : pokemonId.value + 1
})
const prevId = computed(() => {
  return pokemonId.value === POKEMON_SKIP_TO_ID
    ? POKEMON_SKIP_AT_ID
    : pokemonId.value === 1
      ? FINAL_POKEMON_ID
      : pokemonId.value - 1
})

const handleClick = (typeOfClick: string) => {
  numberId.value = pokemonId.value
  if (typeOfClick === 'Next') {
    if (numberId.value === POKEMON_SKIP_AT_ID) {
      numberId.value = POKEMON_SKIP_TO_ID // ids skip from 1025 to 10001 so this handles that case
    } else if (numberId.value === FINAL_POKEMON_ID) {
      numberId.value = 1 // reset id back to one if on the last pokemon
    } else {
      numberId.value++
    }
    return 0
  }

  if (typeOfClick === 'Prev') {
    if (numberId.value === POKEMON_SKIP_TO_ID) {
      numberId.value = POKEMON_SKIP_AT_ID // ids skip from 1025 to 10001 so this handles that case
    } else if (numberId.value === 1) {
      numberId.value += FINAL_POKEMON_ID - 1 // make id the last pokemon's id if we are on the first pokemon
    } else {
      numberId.value--
    }
    return -1
  }
  const pokemonDetailName = '/pokemon/[id]'
  router.push({ name: pokemonDetailName, params: { id: numberId.value } })
}

onMounted(async () => {
  try {
    const id = route.params.id
    if (typeof id === 'string') {
      const response = await getPokemon(id)
      poke.value = response[0]
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="poke" class="container">
    <h1 data-test="name-and-id">#{{ poke.id }} - {{ poke.name.toUpperCase() }}</h1>
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
    <Panel header="Abilities and Type(s)" toggleable class="panel" :collapsed="true">
      <div class="panel-content">
        <div class="panel-content-types-abilities">
          <h2>Types:</h2>
          <p v-for="pokemonType in poke.types" :key="pokemonType.slot">
            {{ pokemonType.type.name.toUpperCase() }}
          </p>
        </div>
        <div class="abilities-div">
          <h2>Abilities:</h2>
          <p v-for="pokemonAbility in poke.abilities" :key="pokemonAbility.slot">
            {{ pokemonAbility.ability.name.toUpperCase() }}
          </p>
        </div>
      </div>
    </Panel>
  </div>
  <div class="btn-div">
    <Button @click="handleClick('Prev')" data-test="prev-btn">#{{ prevId }}</Button>
    <Button @click="handleClick('Next')" data-test="next-btn">#{{ nextId }}</Button>
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
.panel {
  width: 100%;
}
.panel-content {
  display: flex;
  justify-content: space-evenly;
  gap: 4rem;
}

.panel-content h2 {
  font-size: 1.5rem;
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
