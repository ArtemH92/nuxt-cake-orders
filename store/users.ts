import { defineStore } from 'pinia'
import api from '~/api'
import { useToast } from 'primevue/usetoast'

interface User {
  id?: string
  username: string
  password: string
  phone: string
  administrator: boolean
}

export const useUsersStore = defineStore('users', () => {
  const users = reactive<User[] | []>([])
  const user = reactive<User | {}>({})
  const loading = ref<boolean>(true)
  const token = ref<string | null>(null)
  const toast = useToast()

  const isAuth = () => {
    token.value = localStorage.getItem('token')
    if(!token.value) {
      navigateTo('/Login')
    }
    loading.value = false
  }

  const login = async (data: User) => {
    loading.value = true
    try {
      const response = await api.post('/users/login', data)
      localStorage.setItem('token', response.data.token)
      Object.assign(user, response.data)
      token.value = response.data.token
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Вы вошли в систему',
        life: 3000
      })
      navigateTo('/users/list')
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

  const register = async (data: User) => {
    loading.value = true
    try {
      await api.post('/users/register', data)
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Пользователь успешно создан',
        life: 3000
      })
      navigateTo('/users/list')
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

  const currentUser = async () => {
    loading.value = true
    try {
      const response = await api.get('/users/current')
      Object.assign(user, response.data)
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

  const getAllUsers = async () => {
    loading.value = true
    try {
      const response = await api.get('/users/all')
      users.splice(0, users.length, ...response.data)
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

  const editUser = async (user: User) => {
    loading.value = true
    try {
      await api.put(`/users/edit/${user.id}`, user)
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Пользователь успешно обновлен',
        life: 3000
      })
      currentUser()
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

  const logout = () => {
    localStorage.removeItem('token')
    Object.keys(user).forEach((key) => delete user[key])
    token.value = null
    navigateTo('/login')
  }

  const remove = async (id: string) => {
    loading.value = true
    try {
      const response = await api.post(`/users/remove/${id}`)
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: response.data.message,
        life: 3000
      })
      getAllUsers()
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

  return {
    users,
    user,
    loading,
    isAuth,
    login,
    register,
    currentUser,
    getAllUsers,
    editUser,
    logout,
    remove,
    token
  }
})
