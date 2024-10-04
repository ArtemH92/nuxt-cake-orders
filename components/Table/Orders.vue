<script setup>
import { useOrderStore } from '~/store/order';
import moment from 'moment';

const store = useOrderStore()

onMounted(() => store.getAll())

const modalVisible = ref(false)
const id = ref('')

const handleModal = (i) => {
  id.value = i
  modalVisible.value = true
}
const handleRemove = () => {
  store.removeOrder(id.value)
  modalVisible.value = false
}
</script>

<template>
  <div class="card">
    <DataTable
      :value="store.orders"
      sortField="dateTime"
      :sortOrder="1"
      :paginator="store.orders.length > 5"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      size="small"
    >
    <template #header>
      <PageTitle
        url="/orders/add"
        btn-label="Создать заказ"
        title="Список заказов"
        mWidth="max-w-full"
        colorTitle="text-black"
      />
    </template>

    <Column header="Изделие" class="w-1/5">
        <template #body="{ data }">
          {{ data.dessert === 'cake' ? 'Торт' : 'Капкейк' }}
        </template>
      </Column>

      <Column header="Дата и время" field="dateTime" sortable class="w-1/5">
        <template #body="{ data }">
          {{ moment(data.dateTime).format('DD-MM-YYYY HH:mm') }}
        </template>
      </Column>

      <Column header="Действие" class="w-2/5">
        <template #body="{ data }">
          <div class="flex flex-wrap gap-2">
            <Button
              label="Удалить"
              severity="danger"
              @click="handleModal(data.id)"
              size="small"
            />
            <Button
              label="Редактировать"
              @click="navigateTo(`/orders/edit/${data.id}`)"
              size="small"
            />
            <Button
              :label="data.labelStatusBtn"
              v-if="data.status != 'done'"
              :severity="data.severityTag"
              @click="emit('status', data)"
              size="small"
            />
          </div>
        </template>
      </Column>

      <Column header="Статус заказа" class="w-1/5">
        <template #body="{ data }">
          <Tag
            :value="data.statusTag"
            :severity="data.severityTag"
            :icon="data.severityTag === 'secondary' ? 'pi pi-spin pi-spinner' : ''"
          />
        </template>
      </Column>

  </DataTable>
  <ConfirmModal v-model="modalVisible" @cancel="modalVisible = false" @confirm="handleRemove()" />
  </div>
</template>