import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import app from '../app.js'

const ENDPOINT = '/api/v1/mapCoordinatesToCity'

describe(`GET ${ENDPOINT}`, () => {
  describe('happy path', () => {
    test('returns 200 and geo data for valid coordinates', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 54.9964, longitude: 23.490923 })
        .expect(StatusCodes.OK)

      expect(response.body).toEqual({
        geoData: {
          admin1Code: {
            asciiName: 'Kaunas',
            geoNameId: '864477',
            name: 'Kaunas',
          },
          admin2Code: '52',
          admin3Code: '5218',
          admin4Code: null,
          alternateNames: "Vil'kiya,Vilki,Vilkija,Vilkijos,Vil’kiya,Wilki",
          asciiName: 'Vilkija',
          cc2: null,
          countryCode: 'LT',
          dem: '81',
          distance: 8.178667327559564,
          elevation: null,
          featureClass: 'P',
          featureCode: 'PPL',
          geoNameId: '593144',
          latitude: '55.04609',
          longitude: '23.58552',
          modificationDate: '2021-04-26',
          name: 'Vilkija',
          population: '2289',
          timezone: 'Europe/Vilnius',
        },
      })
    })

    test('coerces stringified numeric coordinates', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: '54.9964', longitude: '23.490923' })
        .expect(StatusCodes.OK)

      expect(response.body.geoData.countryCode).toBe('LT')
    })

    test('sets a public cache-control header', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 54.9964, longitude: 23.490923 })
        .expect(StatusCodes.OK)

      expect(response.headers['cache-control']).toMatch(/public, max-age=\d+/)
    })

    test('returns a uid response header for request tracing', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 54.9964, longitude: 23.490923 })
        .expect(StatusCodes.OK)

      expect(response.headers.uid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      )
    })
  })

  describe('validation errors', () => {
    test('returns 400 when latitude is missing', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ longitude: 23.490923 })
        .expect(StatusCodes.BAD_REQUEST)

      expect(response.body.error).toBe('Bad Request')
      expect(response.body.message).toMatch(/latitude/i)
    })

    test('returns 400 when longitude is missing', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 54.9964 })
        .expect(StatusCodes.BAD_REQUEST)

      expect(response.body.message).toMatch(/longitude/i)
    })

    test('returns 400 when latitude is non-numeric', async () => {
      const response = await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 'not-a-number', longitude: 23.490923 })
        .expect(StatusCodes.BAD_REQUEST)

      expect(response.body.message).toMatch(/latitude/i)
    })

    test.each([
      ['too high', 90.0001],
      ['way too high', 200],
      ['too low', -90.0001],
      ['way too low', -200],
    ])('returns 400 when latitude is %s (%s)', async (_label, latitude) => {
      await supertest(app)
        .get(ENDPOINT)
        .query({ latitude, longitude: 23.490923 })
        .expect(StatusCodes.BAD_REQUEST)
    })

    test.each([
      ['too high', 180.0001],
      ['way too high', 360],
      ['too low', -180.0001],
      ['way too low', -360],
    ])('returns 400 when longitude is %s (%s)', async (_label, longitude) => {
      await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 54.9964, longitude })
        .expect(StatusCodes.BAD_REQUEST)
    })

    test('accepts boundary values (lat=90, lon=180)', async () => {
      await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: 90, longitude: 180 })
        .expect(StatusCodes.OK)
    })

    test('accepts boundary values (lat=-90, lon=-180)', async () => {
      await supertest(app)
        .get(ENDPOINT)
        .query({ latitude: -90, longitude: -180 })
        .expect(StatusCodes.OK)
    })
  })
})
