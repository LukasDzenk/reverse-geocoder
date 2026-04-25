// import dotenv from 'dotenv'
// import winston, { Logger } from 'winston'
// import 'winston-mongodb'
// import { envVariables } from '../config/envVariables.js'
// import { connectToDb } from '../config/mongodb.js'
// import mongoose from 'mongoose'
// dotenv.config({ path: '.env' })

// const db = connectToDb()

// const { combine, timestamp, json, printf, errors, prettyPrint, cli } =
//   winston.format

// export const buildWinstonLogger = (): Logger => {
//   const dbConnection = mongoose.connection.getClient()
//   // Promise is needed because the library expects a promise
//   const dbConnectionPromise = Promise.resolve(dbConnection)

//   // Create logger and specify format for transports to use
//   const logger = winston.createLogger({
//     format: combine(errors({ stack: true }), timestamp(), json()),
//   })

//   // Log all errors to a separate collection in MongoDB
//   logger.add(
//     new winston.transports.MongoDB({
//       db: dbConnectionPromise,
//       level: envVariables.ERROR_LOG_LEVEL,
//       collection: 'error_logs',
//       metaKey: 'meta',
//       decolorize: true,
//       options: {
//         poolSize: 5,
//         autoReconnect: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     })
//   )

//   // Development environment only console logging
//   if (envVariables.NODE_ENV === 'development') {
//     /**
//      *  Custom format for console transport
//      *
//      * @param <winston.Logform.TransformableInfo>
//      * @return Formatted log message
//      */
//     const customFormat = printf(({ level }) => {
//       return `${level}`
//     })

//     // Log errors to the console
//     logger.add(
//       new winston.transports.Console({
//         level: 'info',
//         format: combine(cli(), customFormat),
//       })
//     )
//     logger.add(
//       new winston.transports.Console({
//         level: 'info',
//         format: combine(errors({ stack: true }), prettyPrint()),
//       })
//     )
//     // Debug level logging
//     logger.add(
//       new winston.transports.Console({
//         level: 'debug',
//         format: cli(),
//       })
//     )
//   }

//   return logger
// }

// export const winstonLogger = () => {
//   const { combine, timestamp, json, printf, errors, prettyPrint, cli } =
//     winston.format

//   // Create logger and specify format for transports to use
//   const logger = winston.createLogger({
//     format: combine(errors({ stack: true }), timestamp(), json()),
//   })

//   // Log all errors to a separate collection in MongoDB
//   logger.add(
//     new winston.transports.MongoDB({
//       db,
//       level: envVariables.ERROR_LOG_LEVEL,
//       collection: 'error_logs',
//       metaKey: 'meta',
//       decolorize: true,
//       options: {
//         poolSize: 5,
//         autoReconnect: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     })
//   )

//   // Development environment only console logging
//   if (envVariables.NODE_ENV === 'development') {
//     /**
//      *  Custom format for console transport
//      * @return Formatted log message
//      */
//     const customFormat = printf(({ level }) => {
//       return `${level}`
//     })

//     // Log errors to the console
//     logger.add(
//       new winston.transports.Console({
//         level: 'info',
//         format: combine(cli(), customFormat),
//       })
//     )
//     logger.add(
//       new winston.transports.Console({
//         level: 'info',
//         format: combine(errors({ stack: true }), prettyPrint()),
//       })
//     )
//     // Debug level logging
//     logger.add(
//       new winston.transports.Console({
//         level: 'debug',
//         format: cli(),
//       })
//     )
//   }

//   return logger
// }
