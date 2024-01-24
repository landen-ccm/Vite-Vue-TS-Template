<script setup lang="ts">
import type { PokeCard } from '@/helpers/shared'
import Image from 'primevue/image'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const toast = useToast()
const props = defineProps<PokeCard>()
type Favorites = { [key: number]: PokeCard | null }
function load(): Favorites {
  const res = localStorage.getItem('favorites')
  if (res === null) {
    return {}
  }
  return JSON.parse(res)
}

const favorites = ref<Favorites>(load())

const favtoggle = () => {
  favorites.value[props.id] = favorites.value[props.id] ? null : ref(props).value
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
  toast.add({
    severity: favorites.value[props.id] ? 'success' : 'warn',
    summary: favorites.value[props.id]
      ? `Added ${props.name} to favorites!`
      : `Removed ${props.name} from favorites`,
    life: 2000
  })
  location.reload()
}

const favheart = computed(() => favorites.value[props.id])

const favoriteClasses = computed(() => ({
  'pi-heart': !favheart.value,
  'pi-heart-fill': favheart.value
}))
const route = useRouter()

const buttonImage = ref('pi pi-heart')
</script>

<template>
  <Card>
    <template #content>
      <div class="flow-box">
        <Image :src="props.imageUrl" :alt="props.name" />
        <div class="flow-row">
          <Toast />
          <Button>More Info</Button>
          <Button style="max-width: 50px" @click="favtoggle" :icon="buttonImage"
            ><i class="pi" :class="favoriteClasses"></i
          ></Button>
          <Button
            @click="
              route.push({
                name: 'details',
                query: {
                  id: props.id
                }
              })
            "
            >View</Button
          >
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
