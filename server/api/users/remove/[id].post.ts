import { auth } from '~/api/auth'
import { prisma } from '~/prisma/prisma-client'

export default defineEventHandler(async (event) => {
  const { isAuth }: any = auth(event)
  const { id } = getRouterParams(event)
  try {
    if (!isAuth) {
      return createError({
        statusCode: 401,
        message: 'Пользователь не авторизован'
      })
    }

    const user = prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return createError({
        statusCode: 404,
        message: 'Пользователь не найден'
      })
    }

    await prisma.user.delete({
      where: {
        id
      }
    })

    return {
      statusCode: 204,
      message: 'Пользователь успешно удален'
    }
  } catch {
    return createError({ statusCode: 500, message: 'Неизвестная ошибка' })
  }
})
