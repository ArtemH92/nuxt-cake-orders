<script setup>
import { useUsersStore } from '~/store/users'
import { vMaska } from 'maska'

const store = useUsersStore()
const userData = reactive(store.user)

const disabled = ref(true)
const handleEdit = (data) => {
  store.editUser(data)
  disabled.value = true
}
const cancel = () => {
  store.currentUser()
  disabled.value = true
}
</script>

<template>
  <form @submit.prevent="handleEdit(userData)" class="flex flex-col gap-8 mt-5">
    <FloatLabel>
      <InputText v-model="userData.username" :disabled="disabled" />
      <label>Имя пользователя</label>
    </FloatLabel>

    <FloatLabel>
      <InputText
        v-model="userData.phone"
        v-maska
        data-maska="+375 (##) ### ## ##"
        :disabled="disabled"
      />
      <label>Номер телефона</label>
    </FloatLabel>

    <Button label="Редактировать" @click="disabled = false" v-if="disabled" class="mx-auto" />
    <div v-else class="flex justify-between w-full">
      <Button label="Сохранить" type="submit" />
      <Button label="Отмена" @click="cancel()" />
    </div>
  </form>
</template>
