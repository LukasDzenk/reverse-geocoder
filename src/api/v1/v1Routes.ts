import express, { Router } from 'express'
import mapCoordinatesToCityRouter from './reverseGeocoding/features/mapCoordinatesToCity/mapCoordinatesToCity.route.js'

const v1Router: Router = express.Router()

v1Router.use('/', mapCoordinatesToCityRouter)

export { v1Router }
