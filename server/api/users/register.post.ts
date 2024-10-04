import brypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '~/prisma/prisma-client'

export default defineEventHandler(async (event) => {
  try {
    const { username, password, phone, administrator } = await readBody(event)

    if (!username || !password) {
      return createError({
        statusCode: 400,
        message: 'Заполните обязателые поля'
      })
    }

    const registerdUser = await prisma.user.findFirst({ where: { username } })

    if (registerdUser) {
      return createError({
        statusCode: 400,
        message: 'Пользователь, с таким именем уже существует'
      })
    }

    const salt = await brypt.genSalt(10)
    const hashedPassword = await brypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        phone,
        administrator
      }
    })

    const secret = process.env.JWT_SECRET

    if (user && secret) {
      return {
        statusCode: 200,
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      }
    } else {
      return createError({
        statusCode: 400,
        message: 'Не удалось создать пользователя'
      })
    }
  } catch (err) {
    return createError({ statusCode: 500, message: 'Error: ' + err })
  }
})
