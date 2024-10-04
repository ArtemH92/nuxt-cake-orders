<script setup>
const model = defineModel()
const props = defineProps({
  options: Object,
  errors: String,
  label: String,
  disabled: Boolean
})
const emit = defineEmits(['changeField'])
</script>

<template>
  <div>
    <FloatLabel>
      <Select
        v-model="model"
        :id="model"
        :aria-describedby="`${model}-error`"
        :options="props.options"
        optionLabel="label"
        optionValue="value"
        :invalid="errors != ''"
        class="w-full md:w-52"
        @change="emit('changeField')"
        :disabled="props.disabled"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>