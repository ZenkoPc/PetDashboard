import { Router } from 'express'
import { authRoutes } from './auth/routes.js'
import { petRoutes } from './pets/routes.js'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({
    status: 'welcome:success',
    message: 'Welcome to Shop API'
  })
})

routes.use('/auth', authRoutes)
routes.use('/pets', petRoutes)

routes.all('*', (req, res) => {
  res.status(404).json({
    status: 'global:not-found',
    message: `The path ${req.url} does not exist`
  })
})

export {
  routes
}
