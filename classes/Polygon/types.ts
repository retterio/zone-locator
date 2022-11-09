import { z } from 'zod'

export const Coordinate = z.object({
    lat: z.number(),
    lon: z.number()
})

export const Zone = z.object({
    coordinates: Coordinate.array(),
    id: z.string(),
    name: z.string()
})

export type Coordinate = z.infer<typeof Coordinate>
export type Zone = z.infer<typeof Zone>