import { Router } from 'express'
import { Roles } from '../middlewares/constants.js'
import { rolesMiddleware } from '../middlewares/roles.js'
import { schemaValidation } from '../middlewares/zod.js'

import {
  getPetTypeController,
  createOrUpdatePetTypeSchema,
  createPetTypeController,
  updatePetTypeController,
  removePetTypeController
} from './controllers/pet-types.js'

const routes = Router()

routes.get('/pet-type', rolesMiddleware([Roles.superAdmin, Roles.editor, Roles.viewer]), getPetTypeController)
routes.post('/pet-type', rolesMiddleware([Roles.superAdmin, Roles.editor]), schemaValidation(createOrUpdatePetTypeSchema), createPetTypeController)
routes.put('/pet-type/:id', rolesMiddleware([Roles.superAdmin, Roles.editor]), schemaValidation(createOrUpdatePetTypeSchema), updatePetTypeController)
routes.delete('/pet-type/:id', rolesMiddleware([Roles.superAdmin, Roles.editor]), removePetTypeController)

export {
  routes as petRoutes
}
