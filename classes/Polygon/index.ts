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

function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

export async function isInsidePoly(data: Data): Promise<StepResponse> {
  try {
    const { lat, lon } = data.request.body
    const { coordinates } = data.state.public

    console.log(lat);
    console.log(lon);
    console.log(coordinates);
    

    data.response = {
      statusCode: 200,
      body: { success: true, message: inside([lat, lon], [coordinates.lat, coordinates.lon]) },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}

export async function createNewZone(data: Data): Promise<StepResponse> {
  try {
    const { name, id, lat, lon } = data.request.body
    const { coordinates } = data.state.public

    const index = coordinates.findIndex((coord) => coord.id === id)
    if (index !== -1) throw new Error(`Zone with id of ${id} already exists!`);

    coordinates.push({ name, id, lat, lon })

    data.response = {
      statusCode: 200,
      body: { success: true, message: `Zone with id of ${id} succesfully added!` },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}

export async function getZoneInfo(data: Data): Promise<StepResponse> {
  try {
    const { id } = data.request.body
    const { coordinates } = data.state.public

    const index = coordinates.findIndex((coord) => coord.id === id)
    if (index === -1) throw new Error(`Zone with id of ${id} does not exist!`);

    data.response = {
      statusCode: 200,
      body: { success: true, message: coordinates[index] },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}

export async function deleteZone(data: Data): Promise<StepResponse> {
  try {
    const { id } = data.request.body
    const { coordinates } = data.state.public

    const index = coordinates.findIndex((coord) => coord.id === id)
    if (index === -1) throw new Error(`Zone with id of ${id} does not exist!`);

    data.state.public.coordinates = coordinates.filter(coord => coord.id !== id)

    data.response = {
      statusCode: 200,
      body: { success: true, message: `Zone with id of ${id} succesfully deleted!` },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}

export async function updatePolygon(data: Data): Promise<StepResponse> {
  try {
    const { name, id, lat, lon } = data.request.body
    const { coordinates } = data.state.public

    const index = coordinates.findIndex((coord) => coord.id === id)
    if (index === -1) throw new Error(`Zone with id of ${id} does not exist!`);

    coordinates[index] = {name, id, lat, lon}

    data.response = {
      statusCode: 200,
      body: { success: true, message: `Zone with id of ${id} succesfully updated!` },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}

export async function locate(data: Data): Promise<StepResponse> {
  try {
    const { coordinates } = data.state.public

    if (coordinates.length <= 2) throw new Error(`At least 3 zones needed to create the polygon!`);

    data.response = {
      statusCode: 200,
      body: { success: true, coordinates: coordinates },
    }
  } catch (e) {
    data.response = {
      statusCode: 406,
      body: { succes: false, error: e.message },
    }
  }

  return data
}