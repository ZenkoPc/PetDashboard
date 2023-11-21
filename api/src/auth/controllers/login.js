import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { comparePassword } from '../../lib/crypt.js'
import { signToken } from '../../lib/jwt.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function loginController (req, res) {
  try {
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    if (user === null) {
      return res.status(401).json({
        status: 'auth:login:invalid',
        message: 'The user does not exist or his credentials are invalid'
      })
    }

    const isValidPassword = await comparePassword({ value: req.body.password, hash: user.password })

    if (!isValidPassword) {
      return res.status(401).json({
        status: 'auth:login:invalid',
        message: 'The user does not exist or his credentials are invalid'
      })
    }

    const { id, email, name, lastname, role } = user

    const token = signToken({
      data: { email }
    })

    res.json({
      status: 'auth:login:success',
      message: `Hello, ${name} ${lastname}`,
      data: {
        user: { id, email, name, lastname, role },
        session: {
          token,
          userAgent: req.headers['user-agent'] ?? 'Unknown'
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

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email expects a string' }).email('Email is invalid format'),
    password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password expects a string' }).min(6, 'Password too shot')
  })
})
