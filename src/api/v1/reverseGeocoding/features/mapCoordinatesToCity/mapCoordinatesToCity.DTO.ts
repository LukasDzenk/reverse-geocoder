import { z } from 'zod'
import { HttpResponse } from '../../../shared/types/HttpRequest.js'
import { MapCoordinatesToCityGetRequestSchema } from './mapCoordinatesToCity.validator.js'

export type MapCoordinatesToCityGetRequestDTO = z.infer<
  typeof MapCoordinatesToCityGetRequestSchema
>

export type MapCoordinatesToCityGetResponseDTO = HttpResponse<unknown | null>
