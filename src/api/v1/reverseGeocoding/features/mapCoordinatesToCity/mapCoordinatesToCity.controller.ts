import { StatusCodes } from 'http-status-codes'
import globalConstants from '../../../shared/constants/index.js'
import { Controller } from '../../../shared/types/Controller.type.js'
import { MapCoordinatesToCityGetResponseDTO } from './mapCoordinatesToCity.DTO.js'
import mapCoordinatesToCityUseCase from './mapCoordinatesToCity.useCase.js'
import mapCoordinatesToCityGetRequestValidator from './mapCoordinatesToCity.validator.js'

const mapCoordinatesToCityGetController: Controller<
  MapCoordinatesToCityGetResponseDTO
> = async ({ httpRequest }) => {
  const request = mapCoordinatesToCityGetRequestValidator({ httpRequest })

  const { latitude, longitude } = request.query

  const coordinates = {
    latitude,
    longitude,
  }

  const geoEntity = await mapCoordinatesToCityUseCase({
    coordinates,
  })

  if (!geoEntity) {
    const GeoDataNotFoundResponseDTO: MapCoordinatesToCityGetResponseDTO = {
      statusCode: StatusCodes.NOT_FOUND,
      body: null,
    }

    return GeoDataNotFoundResponseDTO
  }

  const mapCoordinatesToCityGetResponseDTO: MapCoordinatesToCityGetResponseDTO =
    {
      headers: {
        'cache-control': `public, max-age=${globalConstants.time.ONE_HOUR_IN_SECONDS}`,
      },
      statusCode: StatusCodes.OK,
      body: {
        geoData: geoEntity,
      },
    }

  return mapCoordinatesToCityGetResponseDTO
}

export default mapCoordinatesToCityGetController
