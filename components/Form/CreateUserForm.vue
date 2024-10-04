<script setup>
import { schemaUser } from '~/schemas'
import { useForm } from 'vee-validate'
import { useUsersStore } from '~/store/users'

const store = useUsersStore()

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaUser
})

const [username] = defineField('username')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
const [administrator] = defineField('administrator')
const [phone] = defineField('phone')

const addUser = handleSubmit((data) => store.register(data))
</script>

<template>
  <form @submit.prevent="addUser" class="flex flex-col gap-6 mt-5">
    <FormFieldsInputForm
      v-model="username"
      label="Имя пользователя"
      :errors="!errors.username ? '' : errors.username"
    />
    <FormFieldsInputPassword
      v-model="password"
      label="Пароль"
      :errors="!errors.password ? '' : errors.password"
    />
    <FormFieldsInputPassword
      v-model="confirmPassword"
      label="Повторите пароль"
      :errors="!errors.confirmPassword ? '' : errors.confirmPassword"
    />
    <FormFieldsMaskInput
      v-model="phone"
      label="Номер телефона"
      :errors="!errors.phone ? '' : errors.phone"
      maska="+375 (##) ### ## ##"
    />
    <div class="w-full flex justify-between items-center">
      <label for="admin">Права администратора</label>
      <Checkbox v-model="administrator" binary input-id="admin" />
    </div>

    <Button label="Зарегистрировать" class="mx-auto" type="submit" />
  </form>
</template>
