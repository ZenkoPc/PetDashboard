import { PrismaClient } from '@prisma/client'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function usersController (req, res) {
  try {
    const prisma = new PrismaClient()

    const users = await prisma.user.findMany({
      select: { id: true, name: true, lastname: true, email: true, role: true, createdAt: true, updatedAt: true },
      where: {
        NOT: {
          role: 'super_admin'
        }
      }
    })

    res.json({
      status: 'auth:users:success',
      message: 'Users list',
      data: {
        users
      }
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      status: 'global:server-error',
      message: 'Internal server error'
    })
  }
}
