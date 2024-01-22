<script setup lang="ts">
import { ref } from 'vue'
const heart = ref('pi pi-heart')
const like = () => {
  if (heart.value == 'pi pi-heart') {
    heart.value = 'pi pi-heart-fill'
  } else {
    heart.value = 'pi pi-heart'
  }
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
    <Button> View Details </Button>
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
