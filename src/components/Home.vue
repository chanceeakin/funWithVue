<script lang="ts">
import { defineComponent } from 'vue'
import Spectrograph from './Spectrograph.vue'

export default defineComponent({
  name: 'App',
  components: {
    Spectrograph
  }
})
</script>

<template>
  <div class="container">
    <Spectrograph msg="Live Spectrograph Analysis" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
