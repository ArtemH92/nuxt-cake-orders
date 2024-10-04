<script setup>
import { useOrderStore } from '~/store/order';
import { useUsersStore } from '~/store/users';

const storeOrders = useOrderStore()
const storeUsers = useUsersStore()
</script>

<template>
  <div>
    <slot v-if="!storeOrders.loading && !storeUsers.loading" />
    <Preloader v-else class="mx-auto" />
  </div>
</template>