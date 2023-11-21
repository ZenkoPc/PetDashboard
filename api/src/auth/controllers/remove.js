import { PrismaClient } from '@prisma/client'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function removeController (req, res) {
  try {
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (user === null) {
      return res.status(404).json({
        status: 'auth:remove:not-found',
        message: `The user with id ${req.params.id} doest not exist`
      })
    }

    const deletedUser = await prisma.user.delete({
      where: user,
      select: { id: true, email: true, name: true, lastname: true, role: true }
    })

    res.json({
      status: 'auth:remove:deleted',
      message: `Good bye, ${deletedUser.name} ${deletedUser.lastname}`,
      data: {
        user: deletedUser
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
