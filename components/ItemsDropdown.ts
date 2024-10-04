export const MenuItems = (id: string, confirmModalVisible: boolean) => {
  return [
    {
      label: 'Список пользователей',
      command: () => navigateTo('/users/list')
    },
    {
      label: 'Редактировать пользователя',
      command: () => navigateTo(`/users/edit/${id}`)
    },
    {
      label: 'Список заказов',
      command: () => navigateTo('/orders/list')
    },
    {
      label: 'Выйти',
      command: () => (confirmModalVisible = true)
    }
  ]
}
