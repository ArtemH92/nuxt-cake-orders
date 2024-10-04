<script setup>
import { useOrderStore } from '~/store/order';

const { id } = useRoute().params
const store = useOrderStore()
onMounted(() => store.getOrder(id))
</script>

<template>
  <div>
    <PageTitle
      url="/orders/list"
      btn-label="Вернуться к списку заказов"
      title="Редактирование заказа"
    />
    <div class="flex justify-center mt-5">
      <div class="card">
        {{ store.order }}
      </div>
    </div>
  </div>
</template>