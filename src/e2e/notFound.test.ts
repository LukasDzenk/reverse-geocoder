import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import app from '../app.js'

describe('unknown routes', () => {
  test('returns 404 for an unknown path', async () => {
    const response = await supertest(app)
      .get('/this-route-does-not-exist')
      .expect(StatusCodes.NOT_FOUND)

    expect(response.body).toEqual({
      error: 'Not found',
      message: 'The requested resource was not found.',
    })
  })

  test('returns 404 for an unknown api version', async () => {
    await supertest(app)
      .get('/api/v999/mapCoordinatesToCity')
      .expect(StatusCodes.NOT_FOUND)
  })
})

describe('CORS preflight', () => {
  test('responds 200 to OPTIONS requests', async () => {
    const response = await supertest(app)
      .options('/api/v1/mapCoordinatesToCity')
      .expect(StatusCodes.OK)

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toContain('GET')
  })
})
