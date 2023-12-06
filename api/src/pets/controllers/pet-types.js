import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function getPetTypeController (req, res) {
  try {
    const prisma = new PrismaClient()

    const petTypes = await prisma.petType.findMany()

    res.json({
      status: 'pets:pet-type:success',
      message: 'Pet type list',
      data: {
        petTypes
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

export const createOrUpdatePetTypeSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name expects a string' })
  })
})

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function createPetTypeController (req, res) {
  try {
    const prisma = new PrismaClient()

    const newPetType = {
      name: req.body.name?.trim()?.toLowerCase()
    }

    const petType = await prisma.petType.create({
      data: newPetType
    })

    res.json({
      status: 'pets:pet-type:create:success',
      message: `Pet type '${petType.name}' created`,
      data: {
        petType
      }
    })
  } catch (error) {
    console.error(error)

    if (error?.code === 'P2002') {
      if (error?.meta?.target?.includes('name')) {
        return res.status(400).json({
          status: 'pets:pet-type:create:failed',
          message: 'Pet type is already exists'
        })
      }
    }

    return res.status(500).json({
      status: 'global:server-error',
      message: 'Internal server error'
    })
  }
}

export async function updatePetTypeController (req, res) {
  try {
    const prisma = new PrismaClient()

    const existPetType = await prisma.petType.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (existPetType === null) {
      return res.status(404).json({
        status: 'pets:pet-type:update:not-found',
        message: `The pet type with id ${req.params.id} doest not exist`
      })
    }

    const updatedPetType = {
      name: req.body.name?.trim()?.toLowerCase()
    }

    const petType = await prisma.petType.update({
      where: { id: req.params.id },
      data: updatedPetType
    })

    res.json({
      status: 'pets:pet-type:update:success',
      message: `Edited, ${petType.name}`,
      data: {
        petType
      }
    })
  } catch (error) {
    console.error(error)

    if (error?.code === 'P2002') {
      if (error?.meta?.target?.includes('name')) {
        return res.status(400).json({
          status: 'pets:pet-type:update:failed',
          message: 'Pet type is already exists'
        })
      }
    }

    return res.status(500).json({
      status: 'global:server-error',
      message: 'Internal server error'
    })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
export async function removePetTypeController (req, res) {
  try {
    const prisma = new PrismaClient()

    const petType = await prisma.petType.findUnique({
      where: {
        id: req.params.id
      }
    })

    if (petType === null) {
      return res.status(404).json({
        status: 'pets:pet-type:remove:not-found',
        message: `The pet type with id ${req.params.id} doest not exist`
      })
    }

    const deletedPetType = await prisma.petType.delete({
      where: petType
    })

    res.json({
      status: 'pets:pet-type:remove:deleted',
      message: `Good bye, ${deletedPetType.name}`,
      data: {
        user: deletedPetType
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
