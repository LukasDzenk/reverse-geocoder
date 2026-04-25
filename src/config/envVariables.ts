import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: '.env' })

const envVariablesSchema = z.object({
  NODE_VERSION: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().int().positive(),
  ERROR_LOG_LEVEL: z.enum(['error', 'warn', 'info']),
  REQ_RES_LOG_LEVEL: z.enum(['error', 'warn', 'info']),
  SERVER_INSTANCE_ID: z.string(),
  // MONGO_REVERSE_GEOCODING_DB_URL: z.string().url(),
})

export const envVariables = envVariablesSchema.parse(process.env)
