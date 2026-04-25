import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import { describe, expect, test } from 'vitest'
import app from '../app.js'

describe('GET /api/v1/mapCoordinatesToCity', () => {
  test('should return 200 and geo data', async () => {
    const response = await supertest(app)
      .get('/api/v1/mapCoordinatesToCity')
      .query({
        latitude: 54.9964,
        longitude: 23.490923,
      })
      .expect(StatusCodes.OK)

    const expectedResponse = {
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
    }

    expect(response.body).toEqual(expectedResponse)
  })
})
