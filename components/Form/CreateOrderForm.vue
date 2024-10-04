<script setup>
import { Choices } from '~/utils/choices';
import { useForm } from 'vee-validate'
import { schemaOrder } from '~/schemas';
import { useOrderStore } from '~/store/order';

const storeOrders = useOrderStore()

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaOrder
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

const finish = handleSubmit((data) => {
  data.status = 'inProcessing'
  storeOrders.addOrder(data)

})
</script>

<template>
  <IsLoading>
    <div class="card">
      <form autocomplete="off" @submit.prevent="finish()" class="flex flex-col gap-6 mt-5">
    
        <FormFieldsSelectForm
          v-model="dessert"
          :options="dessertChoice"
          :errors="!errors.dessert ? '' : errors.dessert"
          label="Изделие"
          @change="ChangeHandler(dessert)"
        />
    
         <FormFieldsSelectForm
          v-if="dessert === 'cake'"
          v-model="cakeType"
          :options="cakeTypeChoice"
          :errors="!errors.cakeType ? '' : errors.cakeType"
          label="Торт"
        />
    
         <FormFieldsSelectForm
          v-if="dessert === 'cupcake'"
          v-model="cupcakesType"
          :options="cupcakesTypeChoice"
          :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
          label="Капкейк"
        />
    
        <FormFieldsSelectForm
          v-if="dessert === 'cupcake'"
          v-model="filling"
          :options="fillingChoice"
          :errors="!errors.filling ? '' : errors.filling"
          label="Начинка"
        />
    
        <FormFieldsInputNum 
          v-if="dessert === 'cupcake'"
          v-model="quantity" 
          label="Количество"
          :errors="!errors.quantity ? '' : errors.quantity"
        />
    
        <FormFieldsDateInput
          v-model="dateTime"
          :errors="!errors.dateTime ? '' : errors.dateTime"
          :min-date="date"
          label="Дата и время"
        />
    
        <FormFieldsTextareaField v-model="notes" label="Примечания" /> 
    
        <Button label="Создать" type="submit" class="mx-auto" />
      </form>
    </div>
  </IsLoading>
</template>