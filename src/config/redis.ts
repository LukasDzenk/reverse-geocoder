// import chalk from 'chalk'
// import { Redis } from 'ioredis'
// import { envVariables } from './envVariables.js'

// let isFriendlyErrorStackEnabled = false
// if (envVariables.NODE_ENV === 'development') {
//   isFriendlyErrorStackEnabled = true
// }

// export const redisClient = new Redis(envVariables.REDIS_URL, {
//   showFriendlyErrorStack: isFriendlyErrorStackEnabled,
// })

// redisClient.on('ready', () => {
//   return console.log(`Redis connected ${chalk.green('successfully')}!`)
// })

// redisClient.on('error', (error) => {
//   return console.log(`Redis ${chalk.red('connection error')}: ${error}`)
// })

// redisClient.on('reconnecting', () => {
//   return console.log(`Redis ${chalk.yellow('reconnecting')}...`)
// })

// redisClient.on('end', () => {
//   return console.log(`Redis ${chalk.red('disconnected')}`)
// })
