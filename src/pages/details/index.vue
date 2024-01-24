<script setup lang="ts">
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
const route = useRoute
</script>
<template>
  <div class="btn-div">
    <Button label="Previous" />
    <Button label="Next" />
  </div>
</template>

<style lang="scss">
.dropdown {
  width: 100%;
  color: black;
}

.btn-div {
  display: flex;
  justify-content: space-between;
}
</style>
