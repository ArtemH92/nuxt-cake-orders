<script setup>
const emit = defineEmits(['cancel', 'confirm'])
const model = defineModel()
</script>

<template>
  <Dialog v-model:visible="model" modal header="Вы уверены?" :closable="false">
    <div class="flex justify-evenly">
      <Button label="Да" severity="danger" @click="emit('confirm')" />
      <Button label="Нет" @click="emit('cancel')" />
    </div>
  </Dialog>
</template>
