<script setup lang="ts">
import type { SpriteLinkType } from '@/models/pokedex'
import Button from 'primevue/button'
import { type SinglePokemonResponse } from '../models/pokedex/index'

const props = withDefaults(
  defineProps<{
    id?: number
    name?: string
    image?: SpriteLinkType | undefined
    isFav: SinglePokemonResponse[]
  }>(),
  { id: 0, name: 'Error', image: undefined }
)

const emit = defineEmits(['like', 'view'])
const handleLike = () => {
  emit('like', props.id)
}

const handleView = () => {
  emit('view', props.id)
}

const test = 0

const displayId = computed(() => props.id.toString().padStart(4, '0'))
const displayName = computed(() => props.name.toUpperCase())
const isFavoriteComp = computed(() => props.isFav.some((x) => x.id === props.id))
</script>

<template>
  <div class="card">
    <h3 data-test = "display">#{{ displayId }} - {{ displayName }}</h3>
    <div>
      <img v-if="props.image" :src="props.image" :alt="props.name" />
      <div v-else>Image not found</div>
    </div>
    <div class="action-container">
      <i
        v-if="!isFavoriteComp"
        class="pi pi-heart"
        v-tooltip.top="'Add to Favorites'"
        @click="handleLike"
      />
      <i
        v-else
        class="pi pi-heart-fill"
        v-tooltip.top="'Remove from Favorites'"
        @click="handleLike"
      />
      <Button data-test = "button" @click="handleView">View</Button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  margin: 2rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
}
h3 {
  font-weight: 700;
}
.action-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
}
.pi {
  cursor: pointer;
}
</style>
