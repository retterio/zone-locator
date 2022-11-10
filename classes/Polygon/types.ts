import { z } from 'zod'

export const coordinate = z.object({
    lat: z.number().min(0).int(),
    lon: z.number().min(0).int(),
})

export const Zone = z.object({
    coordinates: coordinate.array(),
    id: z.string(),
    name: z.string()
})

export type Coordinate = z.infer<typeof coordinate>
export type Zone = z.infer<typeof Zone>