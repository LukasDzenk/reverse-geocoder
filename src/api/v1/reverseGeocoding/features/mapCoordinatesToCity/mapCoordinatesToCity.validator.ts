import { z } from 'zod'
import {
  coordinateLatitudeNumericSchema,
  coordinateLongitudeNumericSchema,
} from '../../../shared/shared.validations.js'
import { HttpRequest } from '../../../shared/types/HttpRequest.js'
import { MapCoordinatesToCityGetRequestDTO } from './mapCoordinatesToCity.DTO.js'

export const MapCoordinatesToCityGetRequestSchema = z.object({
  params: z.object({}),
  query: z.object({
    latitude: coordinateLatitudeNumericSchema,
    longitude: coordinateLongitudeNumericSchema,
  }),
  body: z.object({}),
})

export type MapCoordinatesToCityGetRequestValidator = ({
  httpRequest,
}: {
  httpRequest: HttpRequest
}) => MapCoordinatesToCityGetRequestDTO

const mapCoordinatesToCityGetRequestValidator: MapCoordinatesToCityGetRequestValidator =
  ({ httpRequest }) => {
    return MapCoordinatesToCityGetRequestSchema.parse(httpRequest)
  }

export default mapCoordinatesToCityGetRequestValidator
