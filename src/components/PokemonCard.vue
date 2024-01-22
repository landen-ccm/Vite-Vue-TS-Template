<script setup lang="ts">
import type { SpriteLinkType } from '@/models/pokedex'
import Button from 'primevue/button'

const props = withDefaults(
  defineProps<{
    id?: number
    name?: string
    image?: SpriteLinkType | undefined
  }>(),
  { id: 0, name: 'Error', image: undefined }
)

const displayId = computed(() => props.id.toString().padStart(4, '0'))
const displayName = computed(() => props.name.toUpperCase())
</script>

<template>
  <div class="card">
    <h3>#{{ displayId }} - {{ displayName }}</h3>
    <div>
      <img v-if="props.image" :src="props.image" :alt="props.name" />
      <div v-else>Image not found</div>
    </div>
    <div class="action-container">
      <i class="pi pi-heart" v-tooltip.top="'Add to Favorites'" />
      <Button>View</Button>
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
