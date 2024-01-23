<script setup lang="ts">
import { capitalizeFirstLetter } from '@/helpers/functions'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { favorites } from '@/pages/variables'
import { useToast } from 'primevue/usetoast'
import type { Pokemon } from '@/helpers/types'
import { saveFavorites } from '@/helpers/storeFavorite'

const router = useRouter()

const toast = useToast()

const toggleFavorite = () => {
  if (favorites.value[props.id]) {
    favorites.value[props.id] = undefined
    toast.add({ severity: 'warn', summary: `Removed ${props.name} from favorites`, life: 2000 })
  } else {
    favorites.value[props.id] = ref(props).value // A tad hacky
    toast.add({ severity: 'success', summary: `Added ${props.name} to favorites!`, life: 2000 })
  }
  saveFavorites(favorites.value)
}

const heartFilled = computed(() => favorites.value[props.id])

const favoriteClasses = computed(() => ({
  'pi-heart': !heartFilled.value,
  'pi-heart-fill': heartFilled.value
}))

const props = defineProps<Pokemon>()
</script>

<template>
  <Card>
    <template #title> {{ capitalizeFirstLetter(props.name) }}</template>
    <template #content>
      <img :src="props.url" :alt="props.name" />
      <div class="button-section">
        <Button
          @click="toggleFavorite()"
          v-tooltip.bottom="{
            value: 'Add to favorites',
            pt: {
              text: 'bg-primary font-medium'
            }
          }"
          ><i class="pi" :class="favoriteClasses"></i
        ></Button>
        <Button
          @click="
            router.push({
              name: 'details',
              query: {
                id: props.id
              }
            })
          "
          >View details</Button
        >
      </div>
    </template>
  </Card>
</template>

<style>
button {
  margin-left: 2em;
  height: 3rem;
}
</style>
