import pino from 'pino'
import { envVariables } from '../config/envVariables.js'

const isDevelopment = envVariables.NODE_ENV === 'development'
const isTest = envVariables.NODE_ENV === 'test'

export const logger = pino({
  level: isTest ? 'silent' : envVariables.ERROR_LOG_LEVEL,
  base: { instance: envVariables.SERVER_INSTANCE_ID },
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss.l',
        ignore: 'pid,hostname,instance',
      },
    },
  }),
})
