<script setup>
const model = defineModel()
const props = defineProps({
  label: String,
  disabled: Boolean,
  errors: String
})
</script>

<template>
  <div>
    <FloatLabel>
      <Password
        v-model="model"
        class="w-full"
        :invalid="errors != ''"
        :disabled="props.disabled"
        :aria-describedby="`${model}-error`"
        :feedback="false"
        toggleMask
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
