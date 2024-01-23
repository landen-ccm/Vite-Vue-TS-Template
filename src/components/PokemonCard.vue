<script setup lang="ts">
import Image from 'primevue/image'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const route = useRouter()

type favoritePokemonData = {
  name: string
  id: number
}

const props = defineProps<{
  name?: string
  id?: number
  sprites?: string
  showList?: boolean
  isFavorite?: boolean
  favorite_list?: Array<favoritePokemonData>
}>()

const heart = ref('pi pi-heart')

const emit = defineEmits(['favorite-event'])

function addToFavorite() {
  if (heart.value == 'pi pi-heart') {
    heart.value = 'pi pi-heart-fill'
    emit('favorite-event', { name: props.name, id: props.id, type: 'add' })
    toast.add({ severity: 'info', summary: 'Info', detail: 'Added To Favorite', life: 3000 })
  } else {
    heart.value = 'pi pi-heart'
    emit('favorite-event', { name: props.name, id: props.id, type: 'remove' })
    toast.add({ severity: 'info', summary: 'Info', detail: 'Removed From Favorite', life: 3000 })
  }
}

function viewDetail() {
  route.push('/' + props.id)
}

onMounted(() => {
  if (props.favorite_list == undefined) return
  for (let i = 0; i < props.favorite_list.length; i++) {
    if (props.favorite_list[i].id == props.id) {
      heart.value = 'pi pi-heart-fill'
      break
    }
  }
})
</script>

<template>
  <div>
    <div v-if="props.name" class="p-card">
      <h2>{{ props.name.toUpperCase() }}</h2>
      <p>Id: {{ props.id }}</p>
      <div class="img-div">
        <Image v-if="props.sprites" :src="props.sprites" width="300" alt="pokemon-front" />
      </div>
      <div>
        <i @click="addToFavorite" v-if="!isFavorite" :class="heart" style="font-size: 4rem"></i>
      </div>
      <Toast />
      <Button @click="viewDetail">View</Button>
    </div>
    <div v-else class="error-message">
      <h1>NO POKEMON WITH THAT NAME OR ID!</h1>
    </div>
  </div>
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
  max-height: 600px;
}

.p-card h2 {
  font-size: 3rem;
}

.img-div {
  display: flex;
}

.error-message {
  width: 360px;

  margin: 2rem auto;

  padding: 1rem;

  font-size: xx-large;
}
</style>
