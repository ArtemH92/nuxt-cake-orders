export const MenuItems = (id: string, setConfirmModalVisible: Function) => {
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
      command: () => setConfirmModalVisible(true)
    }
  ]
}
