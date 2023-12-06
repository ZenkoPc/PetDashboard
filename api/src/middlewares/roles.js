import { PrismaClient } from '@prisma/client'
import { verifyToken } from '../lib/jwt.js'

export function rolesMiddleware (roles = []) {
  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   * @param { import('express').NextFunction } next
   */
  return async (req, res, next) => {
    try {
      const prisma = new PrismaClient()

      const bearerToken = req.headers['x-auth-token'] ?? 'Unknown'

      if (bearerToken === 'Unknown') {
        return res.status(403).json({
          status: 'authorization:required',
          message: 'You are not allowed'
        })
      }

      const [, tokenValue] = bearerToken.split(' ')

      const token = verifyToken({ token: tokenValue })

      if (!token.verified) {
        return res.status(403).json({
          status: 'authorization:required',
          message: 'You are not allowed'
        })
      }

      const userEmail = token.payload.data.email

      const user = await prisma.user.findUnique({
        where: {
          email: userEmail
        }
      })

      if (user === null) {
        return res.status(403).json({
          status: 'authorization:required',
          message: 'You are not allowed'
        })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          status: 'authorization:required',
          message: 'You are not allowed'
        })
      }

      next()
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        status: 'global:server-error',
        message: 'Internal server error'
      })
    }
  }
}
