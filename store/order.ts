import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import api from '~/api'
import { AllOrders } from '~/schemas/models'

interface Order {
  id?: string
  dessert: string
  cakeType?: string
  cupcakesType?: string
  filling?: string
  quantity?: null | number,
  dateTime: string
  status: string
  notes: string
}

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive<Order[] | []>([])
  const order = reactive<Order | {}>({})
  const loading = ref<boolean>(false)
  const toast = useToast()

  const getAll = async () => {
    loading.value = true
    try {
      const response = await api.get('/orders/all')
      orders.splice(0, orders.length, ...response.data.map((el) => new AllOrders(el)))
    } catch(err) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: err.response.data.message,
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }

  const getOrder = async (id: string) => {
    loading.value = true
    try {
      const response = await api.get(`/orders/${id}`)
      Object.assign(order, response.data)
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: err.response.data.message,
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }

  const addOrder = async (data: Order) => {
    loading.value = true
    try {
      const response = await api.post('/orders/create', data)
      toast.add({
        severity: 'success',
        summary: 'Успех!',
        detail: response.data.message,
        life: 3000
      })
      await navigateTo('/orders/list')
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: err.response.data.message,
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }

  const editOrder = async (data: Order) => {
    loading.value = true
    try {
      const response = await api.post(`/orders/edit/${data.id}`, data)
      toast.add({
        severity: 'success',
        summary: 'Успех!',
        detail: response.data.message,
        life: 3000
      })
      await getAll()
      await navigateTo('/orders/list')
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: err.response.data.message,
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }

  const removeOrder = async (id: string) => {
    loading.value = true
    try {
      const response = await api.post(`/orders/remove/${id}`)
      toast.add({
        severity: 'success',
        summary: 'Успех!',
        detail: response.data.message,
        life: 3000
      })
      await getAll()
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка!',
        detail: err.response.data.message,
        life: 3000
      })
    } finally {
      loading.value = false
    }
  }

  return { orders, order, loading, addOrder, getAll, getOrder, editOrder, removeOrder }
})
