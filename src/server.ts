import app from './app.js'
import { envVariables } from './config/envVariables.js'
import { logger } from './loggers/logger.js'

const runServer = () => {
  try {
    logger.info('Starting NodeJS server...')

    app.listen(envVariables.PORT, () => {
      logger.info(
        { env: envVariables.NODE_ENV, port: envVariables.PORT },
        'NodeJS is running'
      )
    })
  } catch (error) {
    logger.error({ err: error }, 'Error when starting the NodeJS server')
  }
}

runServer()
