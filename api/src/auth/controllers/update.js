import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { hashPassword } from '../../lib/crypt.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function updateController (req, res) {
  try {
    const prisma = new PrismaClient()

    const existUser = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (existUser === null) {
      return res.status(404).json({
        status: 'auth:update:not-found',
        message: `The user with id ${req.params.id} doest not exist`
      })
    }

    const updatedUser = {
      email: req.body.email,
      name: req.body.name,
      lastname: req.body.lastname,
      password: await hashPassword({ value: req.body.password }),
      role: req.body.role
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updatedUser,
      select: { id: true, email: true, name: true, lastname: true, role: true }
    })

    res.json({
      status: 'auth:update:success',
      message: `Edited, ${user.name} ${user.lastname}`,
      data: {
        user
      }
    })
  } catch (error) {
    console.error(error)

    if (error?.code === 'P2002') {
      if (error?.meta?.target?.includes('email')) {
        return res.status(400).json({
          status: 'auth:register:failed',
          message: 'Email is already in use'
        })
      }
    }

    return res.status(500).json({
      status: 'global:server-error',
      message: 'Internal server error'
    })
  }
}

export const updateSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email expects a string' }).email('Email is invalid format'),
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name expects a string' }),
    lastname: z.string({ required_error: 'Lastname is required', invalid_type_error: 'Lastname expects a string' }),
    password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password expects a string' }).min(6, 'Password too shot'),
    role: z.enum(['editor', 'viewer'], { errorMap: () => ({ message: 'Role expects editor or viewer' }) })
  })
})
