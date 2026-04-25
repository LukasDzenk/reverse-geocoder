import geocoder from 'local-reverse-geocoder'
import { Coordinates } from '../../../shared/types/Coordinates.type.js'

const mapCoordinatesToCityUseCase = async ({
  coordinates,
}: {
  coordinates: Coordinates
}) => {
  const MAX_RESULTS = 1

  const geocoderLookupAsync = (
    coordinates: Coordinates,
    maxResults: number
  ) => {
    return new Promise((resolve, reject) => {
      // @ts-expect-error is oki
      geocoder.lookUp(coordinates, maxResults, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
  }

  const geocoderResponse = (await geocoderLookupAsync(
    coordinates,
    MAX_RESULTS
  )) as GeoData

  return geocoderResponse[0][0]
}

export default mapCoordinatesToCityUseCase

type Location = {
  geoNameId: string
  name: string
  asciiName: string
  alternateNames: string
  latitude: string
  longitude: string
  featureClass: string
  featureCode: string
  countryCode: string
  cc2: null | string
  admin1Code: {
    name: string
    asciiName: string
    geoNameId: string
  }
  admin2Code: string
  admin3Code: string
  admin4Code: null | string
  population: string
  elevation: null | string
  dem: string
  timezone: string
  modificationDate: string
  distance: number
}

type GeoData = Location[][]
