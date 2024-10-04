import { auth } from '~/api/auth'
import { prisma } from '~/prisma/prisma-client'

export default defineEventHandler(async (event) => {
  const { isAuth }: any = auth(event)
  try {
    if (isAuth) {
      const users = prisma.user.findMany()
      return users
    } else {
      createError({ statusCode: 401, message: 'Пользователь не авторизован' })
    }
  } catch {
    return createError({ statusCode: 500, message: 'Ошибка сервера' })
  }
})
