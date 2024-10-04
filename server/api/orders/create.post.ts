import { prisma } from "~/prisma/prisma-client"

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    if(!data.dessert && !data.dateTime) {
      return createError({ statusCode: 400, message: 'Заполните обязательные поля' })
    }

    const order = await prisma.order.create({
      data
    })

    return { order, message: 'Заказ успешно создан' }
  } catch {
    return createError({ statusCode: 500, message: 'Возникла ошибка при создании заказа' })
  }
})
