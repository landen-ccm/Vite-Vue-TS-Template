<script setup lang="ts">
const props = defineProps(['favorite_list'])
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.replace('/')
}
</script>

<template>
  <Button @click="back">back</Button>
  {{ props.favorite_list }}
</template>

<style scoped lang="scss"></style>
