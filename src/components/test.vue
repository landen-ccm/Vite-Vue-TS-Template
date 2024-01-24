<script setup lang="ts">
import { ref } from 'vue'

const test1 = ref('hello')
</script>

<template>
  <div data-test="todo">{{ test1 }}</div>
</template>

<style scoped></style>
