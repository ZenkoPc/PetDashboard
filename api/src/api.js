import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import { routes } from './routes.js'
import { upsertSuperAdmin } from './auth/seed/users.js'

(async () => {
  await upsertSuperAdmin()

  const app = express()

  const PORT = process.env.PORT ?? 3030

  app.set('APP_PORT', PORT)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.use(routes)

  app.listen(app.get('APP_PORT'), () => {
    console.log(`Pet Admin API listen on port ${app.get('APP_PORT')}\nhttp://localhost:${app.get('APP_PORT')}`)
  })
})()
