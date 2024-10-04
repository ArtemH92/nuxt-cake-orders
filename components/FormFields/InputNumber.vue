<script setup>
const model = defineModel('num', { type: Number, default: null })
const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
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
        :invalid="errors != ''"
        :aria-describedby="`${model}-error`"
        :disabled="props.disabled"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>