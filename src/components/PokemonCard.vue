<script setup lang="ts">
import type { PokeCard } from '@/helpers/shared'
import Image from 'primevue/image'
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps<PokeCard>()
console.log(props)
const isFavorite = defineModel<boolean>()

const toggleFavorite = () => (isFavorite.value = !isFavorite.value)

const buttonImage = computed(() => (isFavorite.value ? 'pi pi-heart-fill' : 'pi pi-heart'))
</script>

<template>
  <Card>
    <template #content>
      <div class="flow-box">
        <Image :src="props.imageUrl" :alt="props.name" />
        <div class="flow-row">
          <Button>More Info</Button>
          <Button style="max-width: 50px" @click="toggleFavorite" :icon="buttonImage"></Button>
        </div>
      </div>
    </template>
    <template #title> {{ props.id }}: {{ props.name }} </template>
  </Card>
</template>

<style>
img {
  filter: blur(0);
  -webkit-filter: blur(0);
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  width: 25vw;
}

.p-image {
  display: flex;
  justify-content: center;
}

.flow-box {
  display: flex;
  flex-flow: column;
  justify-items: center;
}

.flow-row {
  display: flex;
  flex-flow: nowrap;
}

.p-button {
  flex: 1;
  margin-left: 1em;
  justify-content: center;
}
</style>
