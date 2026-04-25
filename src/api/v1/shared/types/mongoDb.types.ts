import { Types } from 'mongoose'

export type _Id = Types.ObjectId

export type Point = { type: 'Point'; coordinates: number[] }
