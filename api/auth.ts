import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import { prisma } from '~/prisma/prisma-client'

export const auth = (event: H3Event) => {
  let token = getHeader(event, 'Authorization')?.split(' ')[1]
  let isAuth: boolean | null = null
  if (!token) {
    isAuth = false
    return createError({ statusCode: 401, message: 'Не авторизован' })
  }
  isAuth = true
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return createError({
      statusCode: 401,
      message: 'Секретный ключ не найден'
    })
  }
  const decoded = jwt.verify(token, secret)

  const user = prisma.user.findUnique({
    where: {
      id: decoded.id
    }
  })

  event.context.user = user

  return { user, isAuth }
}
