import { prisma } from "~/prisma/prisma-client"

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });
    return { message: 'Пользователь успешно удален' }
  } catch {
    return createError({ statusCode: 500, message: 'Не удалось получить заказ' })
  }
})