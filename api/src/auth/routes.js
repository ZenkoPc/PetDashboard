import { Router } from 'express'
import { Roles } from '../middlewares/constants.js'
import { schemaValidation } from '../middlewares/zod.js'
import { rolesMiddleware } from '../middlewares/roles.js'
import { loginController, loginSchema } from './controllers/login.js'
import { verifyController, verifySchema } from './controllers/verify.js'
import { registerController, registerSchema } from './controllers/register.js'
import { updateController, updateSchema } from './controllers/update.js'
import { removeController } from './controllers/remove.js'
import { usersController } from './controllers/users.js'

const routes = Router()

routes.post('/login', schemaValidation(loginSchema), loginController)
routes.post('/verify', schemaValidation(verifySchema), verifyController)

routes.post('/register', rolesMiddleware([Roles.superAdmin]), schemaValidation(registerSchema), registerController)
routes.put('/edit/:id', rolesMiddleware([Roles.superAdmin]), schemaValidation(updateSchema), updateController)

routes.delete('/remove/:id', rolesMiddleware([Roles.superAdmin]), removeController)

routes.get('/users', rolesMiddleware([Roles.superAdmin]), usersController)

export {
  routes as authRoutes
}
