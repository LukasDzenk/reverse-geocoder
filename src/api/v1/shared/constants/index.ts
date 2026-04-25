import redisKeyPrefixes from './redisKeyPrefixes.constant.js'
import time from './time.constant.js'

const globalConstants = {
  time,
  redisKeyPrefixes,
} as const

export default globalConstants
