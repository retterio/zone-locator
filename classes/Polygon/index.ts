import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk"

const rdk = new RDK()

export async function authorizer(data: Data): Promise<Response> {
  return { statusCode: 200 }
}

export async function init(data: Data): Promise<InitResponse> {
  return { state: { public: { coordinates: [] } } }
}

export async function getState(data: Data): Promise<Response> {
  return { statusCode: 200, body: data.state }
}