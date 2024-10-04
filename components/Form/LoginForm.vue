<script setup>
import { useForm } from 'vee-validate'
import { schemaLogin } from '~/schemas'
import { useUsersStore } from '~/store/users'

const { login } = useUsersStore()

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaLogin
})

const [username] = defineField('username')
const [password] = defineField('password')

const handleLogin = handleSubmit((data) => login(data))
</script>

<template>
  <isLoading>
    <div class="card">
      <p class="font-bold text-2xl text-center mb-6">Авторизация</p>
      <form autocomplete="off" @submit.prevent="handleLogin" class="flex flex-col gap-8">
        <FormFieldsInputForm
          label="Имя пользователя"
          v-model="username"
          :errors="!errors.username ? '' : errors.username"
        />
        <FormFieldsInputPassword
          label="Пароль"
          v-model="password"
          :errors="!errors.password ? '' : errors.password"
        />
        <Button icon="pi pi-sign-in" icon-pos="right" label="Войти" class="mx-auto" type="submit" />
      </form>
    </div>
  </isLoading>
</template>
