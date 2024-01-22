<script setup lang="ts">
import Button from 'primevue/button'
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
