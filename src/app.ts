import express, { Application, NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import geocoder from 'local-reverse-geocoder'
import { pinoHttp } from 'pino-http'
import { pageNotFoundMiddleware } from './api/v1/shared/shared.handlers.js'
import { ErrorResponseDTO } from './api/v1/shared/types/ErrorResponseDTO.type.js'
import { v1Router } from './api/v1/v1Routes.js'
import { envVariables } from './config/envVariables.js'
import { logger } from './loggers/logger.js'

// @ts-expect-error is oki
geocoder.init(
  {
    citiesFileOverride: 'cities500',
    load: {
      admin1: true,
      admin2: true,
      admin3And4: true,
      alternateNames: false,
    },
    countries: [],
  },
  () => {
    logger.info('geocoder ready')
  }
)

const app: Application = express()

app.use(express.urlencoded({ limit: '20mb', extended: true }))
app.use(express.json({ limit: '20mb' }))
app.disable('x-powered-by')

app.use(
  pinoHttp({
    logger,
    customLogLevel: (_req, res, err) => {
      if (err || res.statusCode >= 500) {
        return envVariables.ERROR_LOG_LEVEL
      }
      if (res.statusCode >= 400) {
        return 'warn'
      }
      return envVariables.REQ_RES_LOG_LEVEL
    },
    autoLogging: {
      ignore: (req) => {
        const url = req.url ?? ''
        return (
          url === '/healthCheck' ||
          url.startsWith('/docs/') ||
          url.startsWith('/images/')
        )
      },
    },
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', '86400')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})

app.use(express.static('src/public'))
app.use('/api/v1', v1Router)
app.get('/healthCheck', (req, res) => {
  res.json({
    status: 'success',
  })
})

app.use(pageNotFoundMiddleware)

app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    logger.error({ err: error }, 'Unhandled error')
    const errorResponseDTO: ErrorResponseDTO = {
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: 'Please try again later',
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponseDTO)
  }
)

export default app
