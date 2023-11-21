import { Router } from 'express'
import { schemaValidation } from '../middlewares/zod.js'
import { superAdminRole } from '../middlewares/super-admin.js'
import { loginController, loginSchema } from './controllers/login.js'
import { verifyController, verifySchema } from './controllers/verify.js'
import { registerController, registerSchema } from './controllers/register.js'
import { removeController } from './controllers/remove.js'
import { usersController } from './controllers/users.js'

const routes = Router()

routes.post('/login', schemaValidation(loginSchema), loginController)
routes.post('/verify', schemaValidation(verifySchema), verifyController)
routes.post('/register', superAdminRole(), schemaValidation(registerSchema), registerController)
routes.delete('/remove/:id', superAdminRole(), removeController)
routes.get('/users', superAdminRole(), usersController)

export {
  routes as authRoutes
}
