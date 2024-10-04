import { prisma } from "~/prisma/prisma-client"

export default defineEventHandler(async (event) => {
  try {
    const orders = prisma.order.findMany()
    return orders
  } catch {
    return createError({ statusCode: 500, message: 'Не удалось получить заказы' })
  }
})
