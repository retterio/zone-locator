import { Data } from "@retter/rdk"
import { insertZone, updateZone, locateZone } from "../polygon"
import test from 'ava'
import { cloneDeep } from 'lodash'

const getMockedData = (): Data => ({
    context: {
        projectId: 'testProject',
        classId: 'testClassId',
        instanceId: 'testInstanceId',
        identity: 'testIdentity',
        action: 'testAction',
        methodName: 'testMethodName',
        requestId: 'testRequestId',
        sourceIP: 'testSourceIP',
        claims: {
            tags: ['REGIONAL_MANAGER#testInstanceId'],
        },
    },
    state: {
        public: { zones: [] },
        private: {},
    },
    config: {},
    env: {},
    request: {
        headers: {},
        httpMethod: 'testHttpMethod',
        queryStringParams: {},
    },
    response: {
        statusCode: 200,
    },
    tasks: [],
    version: 0,
} as any)

test.serial('crud', async (t) => {
    const data = cloneDeep(getMockedData())
    data.request.body = { 
        coordinates: [],
        id: "1",
        name: "First Zone",
    }
    t.deepEqual(data.state.public, { zones: [] })
    await insertZone(data)
    t.deepEqual(data.state.public, { zones: [
        { 
            coordinates: [],
            id: "1",
            name: "First Zone",
        }
    ] })

    data.request.body = { 
        coordinates: [],
        id: "2",
        name: "Second Zone",
    }
    await insertZone(data)
    t.deepEqual(data.state.public, { zones: [
        { 
            coordinates: [],
            id: "1",
            name: "First Zone",
        },
        { 
            coordinates: [],
            id: "2",
            name: "Second Zone",
        }
    ] })

    data.request.body = { 
        coordinates: [
            {
                lat: 0,
                lon: 0,
            },
            {
                lat: 1,
                lon: 0,
            },
            {
                lat: 0,
                lon: 1,
            },
            {
                lat: 1,
                lon: 1,
            }
        ],
        id: "3",
        name: "Third Zone",
    }
    await insertZone(data)
    t.deepEqual(data.state.public, { zones: [
        { 
            coordinates: [],
            id: "1",
            name: "First Zone",
        },
        { 
            coordinates: [],
            id: "2",
            name: "Second Zone",
        },
        { 
            coordinates: [
                {
                    lat: 0,
                    lon: 0,
                },
                {
                    lat: 1,
                    lon: 0,
                },
                {
                    lat: 0,
                    lon: 1,
                },
                {
                    lat: 1,
                    lon: 1,
                }
            ],
            id: "3",
            name: "Third Zone",
        }
    ] })

    data.request.body = { 
        coordinates: [
            {
                lat: 0,
                lon: 0,
            },
            {
                lat: 2,
                lon: 0,
            },
            {
                lat: 0,
                lon: 2,
            },
            {
                lat: 2,
                lon: 2,
            }
        ],
        id: "1",
        name: "First Zone But Changed",
    }
    await insertZone(data)
    t.deepEqual(data.state.public, { zones: [
        { 
            coordinates: [],
            id: "1",
            name: "First Zone",
        },
        { 
            coordinates: [],
            id: "2",
            name: "Second Zone",
        },
        { 
            coordinates: [
                {
                    lat: 0,
                    lon: 0,
                },
                {
                    lat: 1,
                    lon: 0,
                },
                {
                    lat: 0,
                    lon: 1,
                },
                {
                    lat: 1,
                    lon: 1,
                }
            ],
            id: "3",
            name: "Third Zone",
        }
    ] })
    t.deepEqual(data.response, {
        statusCode: 400,
        body: { succes: false, error: `Zone with id of 1 already exists!` },
    })
    data.response = {}

    data.request.body = { 
        coordinates: [
            {
                lat: 0,
                lon: 0,
            },
            {
                lat: 2,
                lon: 0,
            },
            {
                lat: 0,
                lon: 2,
            },
            {
                lat: 2,
                lon: 2,
            }
        ],
        id: "1",
        name: "First Zone But Changed",
    }
    await updateZone(data)
    t.deepEqual(data.state.public, { zones: [
        { 
            coordinates: [
                {
                    lat: 0,
                    lon: 0,
                },
                {
                    lat: 2,
                    lon: 0,
                },
                {
                    lat: 0,
                    lon: 2,
                },
                {
                    lat: 2,
                    lon: 2,
                }
            ],
            id: "1",
            name: "First Zone But Changed",
        },
        { 
            coordinates: [],
            id: "2",
            name: "Second Zone",
        },
        { 
            coordinates: [
                {
                    lat: 0,
                    lon: 0,
                },
                {
                    lat: 1,
                    lon: 0,
                },
                {
                    lat: 0,
                    lon: 1,
                },
                {
                    lat: 1,
                    lon: 1,
                }
            ],
            id: "3",
            name: "Third Zone",
        }
    ] })
})

test.serial('locateZone', async (t) => {
    const data = cloneDeep(getMockedData())
    data.state.public = { zones: [
        { 
            coordinates: [
                [0,0],
                [0,2],
                [2,0],
                [2,2],
            ],
            id: "1",
            name: "First Zone But Changed",
        },
        { 
            coordinates: [],
            id: "2",
            name: "Second Zone",
        },
        { 
            coordinates: [
                [0,0],
                [0,1],
                [1,0],
                [1,1],
            ],
            id: "3",
            name: "Third Zone",
        }
    ] }
    data.request.body = {
        lat: 1.5,
        lon: 1,
    }
    await locateZone(data)
    t.deepEqual(data.response, {
        statusCode: 200,
        body: { success: true, zoneIds: ["1"]},
    })
})