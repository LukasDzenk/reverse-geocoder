import chalk from 'chalk'
// import compression from 'compression'
import express, { Application, NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import geocoder from 'local-reverse-geocoder'
import morgan from 'morgan'
import { pageNotFoundMiddleware } from './api/v1/shared/shared.handlers.js'
import { ErrorResponseDTO } from './api/v1/shared/types/ErrorResponseDTO.type.js'
import { v1Router } from './api/v1/v1Routes.js'
import { envVariables } from './config/envVariables.js'
// import {
//   logErrorsMiddleware,
//   logReqAndResMiddleware,
// } from './middleware/logReqAndRes.middleware.js'

// @ts-expect-error is oki
geocoder.init(
  {
    citiesFileOverride: 'cities500', // one of 'cities500', 'cities1000', 'cities5000', 'cities15000' or null to keep the default city database (cities1000)
    load: {
      admin1: true,
      admin2: true,
      admin3And4: true,
      alternateNames: false,
    },
    // Comma-separated list of country codes. An empty array means all countries.
    countries: [],
  },
  () => {
    // Ready to call lookUp
    console.log('geocoder ready!')
  }
)

const app: Application = express()

// Middleware for POST/PUT requests
app.use(express.urlencoded({ limit: '20mb', extended: true }))
app.use(express.json({ limit: '20mb' }))
app.disable('x-powered-by')
// Set headers
app.use((req, res, next) => {
  // Security headers (Enable CORS)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', '86400') // ?test whether this works for caching POST pre-flight requests

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})
// Use compression (as advised in Express docs)
// Compression will be used with files over 1-1.5kb (default)
// app.use(compression())

if (envVariables.NODE_ENV === 'development') {
  // Log requests to console
  app.use(
    morgan(
      `\n\n\n${chalk.green('info')}:    ${chalk
        .hex('#BF40BF')
        .bold('Request')}: :method :url`,
      {
        immediate: true, // Log request without waiting for response to be sent
      }
    )
  )
}

// Logging middleware - log all requests and responses
// Note: logger must go before routes
// app.use(logReqAndResMiddleware()) // Note: brackets needed because it's a function

// Routes
app.use(express.static('src/public'))
app.use('/api/v1', v1Router)
app.get('/healthCheck', (req, res) => {
  res.json({
    status: 'success',
  })
})

// Send a 404 error if no route is matched
app.use(pageNotFoundMiddleware)

// Log errors
// Note 1: errorLogger must go after routes.
// Note 2: requests with invalid JSON will not be logged because they happen
// in the express.json() middleware - before logger middleware
// app.use(logErrorsMiddleware)

// Error handler
app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    const errorResponseDTO: ErrorResponseDTO = {
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: 'Please try again later',
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponseDTO)
  }
)

export default app
