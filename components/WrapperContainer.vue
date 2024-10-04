<script setup>
import { useUsersStore } from '~/store/users'

const userStore = useUsersStore()
onMounted(() => userStore.currentUser())
</script>

<template>
  <div class="bg-wrapper h-screen">
    <slot />
    <Toast />
  </div>
</template>
