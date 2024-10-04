<script setup>
import { useUsersStore } from '~/store/users'

const store = useUsersStore()
onMounted(() => store.getAllUsers())

const handleNavigate = (id) => {
  navigateTo(`/users/edit/${id}`)
}

const modalVisible = ref(false)
const id = ref('')

const handleModal = (i) => {
  id.value = i
  modalVisible.value = true
}
const handleRemove = () => {
  store.remove(id.value)
  modalVisible.value = false
}
</script>

<template>
  <IsLoading>
    <div class="card">
      <DataTable :value="store.users" size="small">
        <template #header>
          <PageTitle
            :url="store.user.administrator ? '/users/add' : '/orders/list'"
            :btn-label="
              store.user.administrator ? 'Создать пользователя' : 'Вернуться к списку заказов'
            "
            title="Список пользователей"
            mWidth="max-w-full"
            colorTitle="text-black"
          />
        </template>
  
        <Column header="Имя" class="w-1/4">
          <template #body="{ data }">
            {{ data.username }}
          </template>
        </Column>
  
        <Column header="Номер телефона" class="w-1/4">
          <template #body="{ data }">
            {{ data.phone === null ? '--/--' : data.phone }}
          </template>
        </Column>
  
        <Column header="Администратор" class="w-1/4">
          <template #body="{ data }">
            <GoogleIcon icon="done" v-if="data.administrator" color="text-green-600" />
            <GoogleIcon icon="cancel_presentation" v-else color="text-red-600" />
          </template>
        </Column>
  
        <Column header="Действие" class="w-1/4">
          <template #body="{ data }">
            <div class="flex gap-3">
              <Button
                label="Удалить"
                severity="danger"
                @click="handleModal(data.id)"
                :disabled="data.administrator"
                v-show="store.user.administrator"
              />
              <Button
                label="Редактировать"
                @click="handleNavigate(data.id)"
                :disabled="
                  data.id != store.user.id || (data.administrator && data.id != store.user.id)
                "
              />
            </div>
          </template>
        </Column>
      </DataTable>
      <ConfirmModal v-model="modalVisible" @cancel="modalVisible = false" @confirm="handleRemove()" />
    </div>
  </IsLoading>
</template>
