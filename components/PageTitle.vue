<script setup>
const props = defineProps({
  title: String,
  url: String,
  btnLabel: String,
  mWidth: {
    type: String,
    default: 'max-w-4xl'
  },
  colorTitle: {
    type: String,
    default: 'text-white'
  }
})
</script>

<template>
  <div :class="`${props.mWidth} mx-auto w-full flex justify-between items-center mt-3`">
    <p :class="`${props.colorTitle} text-2xl font-medium`">{{ props.title }}</p>
    <Button as="router-link" :to="props.url" :label="props.btnLabel" severity="help" />
  </div>
</template>
