<script setup>
import moment from 'moment'

const currentTime = ref('')
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = moment().format('DD MM YYYY HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <span class="text-white">{{ currentTime }}</span>
</template>
