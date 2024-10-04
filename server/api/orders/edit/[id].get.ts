import { prisma } from "~/prisma/prisma-client"

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const { id } = getRouterParams(event)

    await prisma.order.update({
      where: {
        id,
      },
      data
    })
    return { message: 'Заказ успешно обновлен' }
  } catch {
    return createError({ statusCode: 500, message: 'Не удалось редактировать заказ' })
  }
})