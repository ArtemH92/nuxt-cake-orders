<script setup>
import { vMaska } from 'maska'

const model = defineModel()
const props = defineProps({
  label: String,
  disabled: Boolean,
  errors: String,
  maska: String
})
</script>

<template>
  <div>
    <FloatLabel>
      <InputText
        v-model="model"
        class="w-full"
        :invalid="errors != ''"
        :disabled="props.disabled"
        :aria-describedby="`${model}-error`"
        v-maska
        :data-maska="maska"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
