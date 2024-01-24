<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  isLiked: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number
  }
})
const emit = defineEmits(['likeEvent'])

const heart = computed(() => (props.isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'))

const like = () => {
  emit('likeEvent')
}
const detailHandler = () => {
  console.log('hello')
  router.push(`/details/${props.id}`)
}
</script>

<template>
  <div class="p-card">
    <div class="name">
      <slot name="name"></slot>
    </div>
    <div class="_id">
      <slot name="_id"></slot>
    </div>
    <div class="img">
      <slot name="img"></slot>
    </div>
    <div class="addToLike" style="margin-bottom: 10px">
      <i @click="like" :class="heart" style="font-size: 2rem"></i>
    </div>
    <Button @click="detailHandler"> View Details </Button>
  </div>
</template>

<style lang="scss">
.p-card {
  width: 360px;
  margin: 2rem auto;
  border: 1px solid #c8ced3;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
