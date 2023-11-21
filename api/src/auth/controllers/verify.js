import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { signToken, verifyToken } from '../../lib/jwt.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function verifyController (req, res) {
  try {
    const prisma = new PrismaClient()

    const token = verifyToken({ token: req.body.token })

    if (!token.verified) {
      return res.status(401).json({
        status: 'auth:login:expired',
        message: 'Token is invalid or expired'
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: token.payload.data.email
      }
    })

    if (user === null) {
      return res.status(401).json({
        status: 'auth:login:invalid',
        message: 'The user does not exist or his credentials are invalid'
      })
    }

    const { id, email, name, lastname, role } = user

    const newToken = signToken({
      data: { email }
    })

    res.json({
      status: 'auth:login:verified',
      message: `Hello again, ${name} ${lastname}`,
      data: {
        user: { id, email, name, lastname, role },
        session: {
          newToken
        }
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

export const verifySchema = z.object({
  body: z.object({
    token: z.string({ required_error: 'Token is required', invalid_type_error: 'Token expects a string' })
  })
})
