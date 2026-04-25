import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import app from '../app.js'

describe('GET /healthCheck', () => {
  test('returns 200 with success status', async () => {
    const response = await supertest(app)
      .get('/healthCheck')
      .expect(StatusCodes.OK)

    expect(response.body).toEqual({ status: 'success' })
  })
})
