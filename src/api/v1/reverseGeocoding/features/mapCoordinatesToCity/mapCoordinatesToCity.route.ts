import express, { Router } from 'express'
import expressCallback from '../../../shared/wrappers/expressCallback.wrapper.js'
import mapCoordinatesToCityGetController from './mapCoordinatesToCity.controller.js'

const mapCoordinatesToCityRouter: Router = express.Router()

mapCoordinatesToCityRouter.get(
  '/mapCoordinatesToCity',
  expressCallback(mapCoordinatesToCityGetController)
)

export default mapCoordinatesToCityRouter
