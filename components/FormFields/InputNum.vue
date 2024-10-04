<script setup>
const model = defineModel()
const props = defineProps({
  errors: String,
  label: String,
  disabled: Boolean
})
</script>

<template>
  <div>
    <FloatLabel>
      <InputNumber
        v-model="model"
        :disabled="props.disabled"
        :invalid="errors != ''"
        :aria-describedby="`${model}-error`"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>