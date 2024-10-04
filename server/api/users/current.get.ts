import { auth } from '~/api/auth'

export default defineEventHandler(async (event) => {
  try {
    const { user }: any = auth(event)
    return user
  } catch (error) {
    return createError({ statusCode: 500, message: 'Неизвесная ошибка' })
  }
})
