import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk"
import { Zone, Coordinate } from './types'

export async function insertZone(data: Data): Promise<StepResponse> {
    try {
        const { coordinates, id, name } = data.request.body as Zone
        const { zones } = data.state.public!

        const index = zones.findIndex((zone: Zone) => zone.id === id)
        if (index !== -1) throw new Error(`Zone with id of ${id} already exists!`);

        zones.push({coordinates, id, name})

        data.response = {
            statusCode: 200,
            body: { success: true, message: zones },
        }
    } catch (e) {
        data.response = {
            statusCode: 400,
            body: { succes: false, error: e.message },
        }
    }

    return data
}

export async function removeZone(data: Data): Promise<StepResponse> {
    try {
        const { id } = data.request.body as Zone
        const { zones } = data.state.public!

        const index = zones.findIndex((zone: Zone) => zone.id === id)
        if (index === -1) throw new Error(`Zone with id of ${id} does not exist!`);

        data.state.public!.zones = zones.filter((zone: Zone) => zone.id !== id)

        data.response = {
            statusCode: 200,
            body: { success: true, message: data.state.public!.zones },
        }
    } catch (e) {
        data.response = {
            statusCode: 400,
            body: { succes: false, error: e.message },
        }
    }

    return data
}

export async function updateZone(data: Data): Promise<StepResponse> {
    try {
        const { coordinates, id, name } = data.request.body as Zone
        const { zones } = data.state.public!

        const index = zones.findIndex((zone: Zone) => zone.id === id)
        if (index === -1) throw new Error(`Zone with id of ${id} does not exist!`);

        zones[index] = {coordinates, id, name};

        data.response = {
            statusCode: 200,
            body: { success: true, message: zones },
        }
    } catch (e) {
        data.response = {
            statusCode: 400,
            body: { succes: false, error: e.message },
        }
    }

    return data
}

export async function getZones(data: Data): Promise<StepResponse> {
    try {
        const { zones } = data.state.public!

        data.response = {
            statusCode: 200,
            body: { success: true, message: zones},
        }
    } catch (e) {
        data.response = {
            statusCode: 400,
            body: { succes: false, error: e.message },
        }
    }

    return data
}

const inside = (zone: Zone, coordinate: Coordinate): boolean => {
    const x = coordinate.lat
    const y = coordinate.lon
    const dots = zone.coordinates

    for (var i = 0, j = dots.length - 1; i < dots.length; j = i++) {
        const xi = dots[i][0] 
        const yi = dots[i][1]
        const xj = dots[j][0]
        const yj = dots[j][1]

        const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) return true
    }

    return false;
};

export async function locateZone(data: Data): Promise<StepResponse> {
    try {
        const input = data.request.body as Coordinate
        const zones = data.state.public!.zones as Zone[]

        const zoneIds: string[] = []

        zones.forEach((zone: Zone) => {
            const isInside = inside(zone, input)
            if (isInside) zoneIds.push(zone.id)
        })
        
        data.response = {
            statusCode: 200,
            body: { success: true, zoneIds},
        }
    } catch (e) {
        data.response = {
            statusCode: 400,
            body: { succes: false, error: e.message },
        }
    }

    return data
}


