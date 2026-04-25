import z from 'zod'

export const coordinateLatitudeNumericSchema = z.coerce
  .number()
  .min(-90)
  .max(90)

export const coordinateLongitudeNumericSchema = z.coerce
  .number()
  .min(-180)
  .max(180)

export const coordinateSchema = z.object({
  latitude: coordinateLatitudeNumericSchema,
  longitude: coordinateLongitudeNumericSchema,
})
