<script setup>
const model = defineModel()
const props = defineProps({
  label: String,
  disabled: Boolean
})
</script>

<template>
  <FloatLabel>
    <Textarea v-model="model" cols="25" :autoResize="true" :disabled="props.disabled" />
    <label>{{ props.label }}</label>
  </FloatLabel>
</template>