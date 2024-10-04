import { prisma } from '~/prisma/prisma-client'
import brypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event)
    if (!username || !password) {
      return createError({
        statusCode: 400,
        message: 'Заполните обязательные поля'
      })
    }

    const user = await prisma.user.findFirst({
      where: { username }
    })

    const isPasswordCorrect = user && (await brypt.compare(password, user.password))
    const secret = process.env.JWT_SECRET

    if (user && isPasswordCorrect && secret) {
      return {
        statusCode: 200,
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      }
    } else {
      return createError({
        statusCode: 400,
        message: 'Неверно введен логин или пароль'
      })
    }
  } catch (err) {
    return createError({ statusCode: 500, message: 'error: ' + err })
  }
})
