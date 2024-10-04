<script setup>
const model = defineModel()
const props = defineProps({
  errors: String,
  label: String,
  minDate: Date,
  disabled: Boolean
})
</script>

<template>
  <div>
    <FloatLabel>
      <DatePicker
        v-model="model"
        :invalid="errors != ''"
        :min-date="props.minDate"
        :aria-describedby="`${model}-error`"
        showTime
        hourFormat="24"
        date-format="dd mm yy"
        :disabled="props.disabled"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>