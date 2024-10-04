<script setup>
import { useUsersStore } from '~/store/users'
import { MenuItems } from './ItemsDropdown'

const store = useUsersStore()
const menu = ref()
const confirmModalVisible = ref(false)

const setConfirmModalVisible = (value) => {
  confirmModalVisible.value = value
}
const items = reactive(MenuItems(store.user.id, setConfirmModalVisible))

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="flex items-center">
    <span class="text-white pr-2">{{ store.user.username }}</span>
    <Button
      severity="help"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      size="small"
      icon="pi pi-user"
    />
    <Menu ref="menu" id="overlay_menu" :popup="true" :model="items"></Menu>
    <ConfirmModal
      v-model="confirmModalVisible"
      @confirm="store.logout()"
      @cancel="confirmModalVisible = false"
    />
  </div>
</template>
