<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  {
    href: 'https://www.scichart.com/',
    title: 'SciChart',
    copy: 'A WASM based scientific charting library.'
  },
  {
    href: 'https://vuejs.org/',
    title: 'Vue3 + Vite',
    copy: 'The Progressive Javascript Framework.'
  },
  {
    href: 'https://aws.amazon.com/amplify/',
    title: 'AWS Amplify',
    copy: 'An all in one solution for frontend DX + deployment.'
  },
  {
    href: 'https://www.terraform.io/',
    title: 'Terraform',
    copy: 'An infrastructure automation language.'
  }
])
</script>

<template>
  <div class="about">
    <!-- if this was a  -->
    <h1 class="titel">About</h1>
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Fourier_transform"
        target="_blank"
        rel="noopener noreferrer"
        >The Fourier Transform</a
      >
      is an algorithm which parses out individual waves from complex wave. Using it, we can see the
      different frequencies from a sound file in real time.
    </p>
    <h3 class="subtitle">This project uses a few different sources:</h3>
    <ul>
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.title }}</a>
        <span>{{ link.copy }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
.title {
  margin-bottom: 2em;
}
.subtitle {
  margin-top: 1em;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
