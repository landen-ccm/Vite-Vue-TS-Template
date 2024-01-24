<script setup lang="ts">
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const test = ref()

</script>
<template>
  <h1>Details</h1>
  <input data-test="inputtext" type="text" v-model="test">
  <div data-test="viewinput">{{ test }}</div>
</template>
