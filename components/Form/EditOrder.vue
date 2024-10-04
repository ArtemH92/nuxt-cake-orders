<script setup>
import { useOrderStore } from '~/store/order';
import { useForm } from 'vee-validate'
import { schemaOrder } from '~/schemas';

const store = useOrderStore()
const { id } = useRoute().params
onMounted(async () => {
  await store.getOrder(id)
  setValues(store.order);
});

const disabled = ref(true)

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices

const { defineField, handleSubmit, errors, setValues } = useForm({
    validationSchema: schemaOrder,
  })

const [dessert] = defineField('dessert')
const [cakeType] = defineField('cakeType')
const [cupcakesType] = defineField('cupcakesType')
const [filling] = defineField('filling')
const [quantity] = defineField('quantity')
const [dateTime] = defineField('dateTime')
const [notes] = defineField('notes')

const ChangeHandler = (dessert) => {
  if (dessert === 'cake') {
    cupcakesType.value = ''
    filling.value = ''
    quantity.value = null
  }

  if (dessert === 'cupcake') {
    cakeType.value = ''
  }
}


const date = ref(new Date())
date.value.setDate(date.value.getDate() + 3)

const handleFinish = handleSubmit((data) => {
  store.editOrder(data)
})

const handleResetForm = () => {
  disabled.value = true
  store.getOrder(id)
}
</script>

<template>
  
  <form autocomplete="off" @submit.prevent="handleFinish" class="flex flex-col gap-6 mt-5" @reset="handleResetForm()">

    <FormFieldsSelectForm
      v-model="dessert"
      :options="dessertChoice"
      :errors="!errors.dessert ? '' : errors.dessert"
      label="Изделие"
      @change="ChangeHandler(dessert)"
      :disabled="disabled"
    />

    <FormFieldsSelectForm
      v-if="dessert === 'cake'"
      v-model="cakeType"
      :options="cakeTypeChoice"
      :errors="!errors.cakeType ? '' : errors.cakeType"
      label="Торт"
      :disabled="disabled"
    />

    <FormFieldsSelectForm
      v-if="dessert === 'cupcake'"
      v-model="cupcakesType"
      :options="cupcakesTypeChoice"
      :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
      label="Капкейк"
      :disabled="disabled"
    />

    <FormFieldsSelectForm
      v-if="dessert === 'cupcake'"
      v-model="filling"
      :options="fillingChoice"
      :errors="!errors.filling ? '' : errors.filling"
      label="Начинка"
      :disabled="disabled"
    />

    <FormFieldsInputNum 
      v-if="dessert === 'cupcake'"
      v-model="quantity" 
      label="Количество"
      :errors="!errors.quantity ? '' : errors.quantity"
      :disabled="disabled"
    />

    <FormFieldsDateInput
      v-model="dateTime"
      :errors="!errors.dateTime ? '' : errors.dateTime"
      :min-date="date"
      label="Дата и время"
      :disabled="disabled"
    />

    <FormFieldsTextareaField v-model="notes" label="Примечания" :disabled="disabled" /> 

    <div class="flex justify-center">
      <Button label="Редактировать" v-if="disabled" @click="disabled = false" />
      <div v-else class="w-full flex justify-between">
        <Button label="Сохранить" type="submit" />
        <Button label="Отмена" type="reset" />
      </div>
    </div>
  </form>
</template>