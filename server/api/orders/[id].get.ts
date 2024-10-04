import { prisma } from "~/prisma/prisma-client"

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  try {
    const order = await prisma.order.findUnique({
      where: {
        id
      }
    })
    return order
  } catch {
    return createError({ statusCode: 500, message: 'Не удалось получить заказ' })
  }
})