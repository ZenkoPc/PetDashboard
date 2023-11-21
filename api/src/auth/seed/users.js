import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../lib/crypt.js'

export async function upsertSuperAdmin () {
  const prisma = new PrismaClient()
  const password = await hashPassword({ value: process.env.SUPER_ADMIN_PASSWORD })

  try {
    await prisma.user.upsert({
      where: {
        email: process.env.SUPER_ADMIN_EMAIL
      },
      create: {
        email: process.env.SUPER_ADMIN_EMAIL,
        name: 'Super',
        lastname: 'Admin',
        password,
        role: 'super_admin'
      },
      update: {
        email: process.env.SUPER_ADMIN_EMAIL,
        password,
        role: 'super_admin'
      }
    })
  } catch (error) {
    console.error(error)
    console.error('super_admin no created.')
    process.exit(1)
  }
}
