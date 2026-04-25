// import chalk from 'chalk'
// import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import { envVariables } from './envVariables.js'

// dotenv.config({ path: '.env' })

// // * Log mongoose actions
// // if (envVariables.NODE_ENV === 'development') {
// //   mongoose.set('debug', true)
// // }

// export const connectToDb = async () => {
//   let reconnectionCount = 1
//   let reconnectionDelay = 3000

//   const dbConnection = await attemptConnectionToDb(
//     envVariables.MONGO_REVERSE_GEOCODING_DB_URL
//   )

//   mongoose.connection.on('connected', () => {
//     console.log(`MongoDB connected ${chalk.green('successfully')}!`)
//   })

//   // Get notified about DB disconnects
//   // Note: disconnected event can be emitted multiple times
//   mongoose.connection.on('disconnected', () => {
//     if (reconnectionCount < 20) {
//       console.log(
//         `MongoDB ${chalk.red(
//           'disconnected'
//         )}! Time: '${new Date()}'. Attempting to reconnect... Attempt number: '${reconnectionCount}', reconnection delay used: '${reconnectionDelay}ms'`
//       )

//       // Reconnect to DB after a delay
//       setTimeout(() => {
//         {
//           attemptConnectionToDb(envVariables.MONGO_REVERSE_GEOCODING_DB_URL)
//         }
//       }, reconnectionDelay)

//       reconnectionCount++
//       reconnectionDelay += 2000

//       return
//     }

//     throw new Error('Reconnection attempts exceeded')
//   })

//   mongoose.connection.on('error', (error) => {
//     console.log(`MongoDB ${chalk.red('connection error')}: ${error}`)
//   })

//   return dbConnection
// }

// const attemptConnectionToDb = async (mongoDbRatingDbUrl: string) => {
//   if (!mongoDbRatingDbUrl) {
//     throw new Error('MONGO_REVERSE_GEOCODING_DB_URL is not defined')
//   }

//   await mongoose.connect(mongoDbRatingDbUrl, {
//     maxPoolSize: 20,
//   })

//   // Get MongoDB native driver connection
//   const dbConnection = mongoose.connection.getClient()

//   return dbConnection
// }
