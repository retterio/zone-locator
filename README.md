# How Build & Deploy

### Rio CLI is required to use this project. You can follow instructions of documentation.
```bash
https://docs.retter.io/docs/cli
```

## Getting Project Ready

####  1-) Change projectId with your projects id inside "rio.json".
####  2-) Open terminal in project directory and install libraries with
```bash
npm i
```
####  3-) Chnage directory of terminal to classes and again install libraries.
####  4-) Now you can deploy project to rio. 

## Deployment


```bash
rio deploy --project-id YOUR_PROJECT_ID --profile YOUR_PROFILE_NAME
```

# How it works
```typescript
interface Cordinate {
    lat: number
    lon: number
}

interface Zone {
    cordinates: Cordinate[]
    id: string
    name: string
}

interface PublicState {
    zones: Zone[]
}
```

insertZone -> input: cordinates, id , name?
removeZone -> input: id 
updateZone -> input: id, cordinates?,  name?

locateZone -> Cordinate alıcak, zoneId[] dönücek,
getZones -> return state.public.zones

# Input for tests 

insertZone Body
```bash
{
        "coordinates": [
          [
            41.03412,
            28.940514
          ],
          [
            41.008752,
            28.966166
          ],
          [
            40.984595,
            28.910025
          ]
        ],
        "id": "1",
        "name": "Fatih"
      }

```

Then

locateZone Body
```bash
{
    "lat": 44.013762,
    "lon": 28.933997
}
```