import { ZodError } from 'zod'

/**
 * @param { import('zod').AnyZodObject } schema
 * @returns
 */
export function schemaValidation (schema) {
  /**
   * @param { import('express').Request } req
   * @param { import('express').Response } res
   * @param { import('express').NextFunction } next
   */
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })

      next()
    } catch (error) {
      console.error(error)

      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'validation:bad-request',
          message: 'Validation failed',
          errors: error.issues.map(({ message }) => message)
        })
      }

      return res.status(500).json({
        status: 'global:server-error',
        message: 'Internal server error'
      })
    }
  }
}
