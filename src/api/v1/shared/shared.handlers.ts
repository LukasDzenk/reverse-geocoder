import { Request, Response } from 'express'
import { ErrorResponseDTO } from './types/ErrorResponseDTO.type.js'

/**
 * If the requested resource was not found, send a 404 response
 * with a message and error code.
 */
export const pageNotFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).send({
    error: 'Not found',
    message: 'The requested resource was not found.',
  } satisfies ErrorResponseDTO)
}
