import { zodToJsonSchema } from 'zod-to-json-schema'
import fs from 'fs'
import path from 'path'
import { ZodType } from 'zod'
import { coordinate } from '../types'


const modelExporter = (t: ZodType<any>, name: string) => {
  const r = zodToJsonSchema(t, { name, $refStrategy: 'none' })
  fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'models', `${name}.json`), JSON.stringify(r.definitions[name], null, 4))
}

modelExporter(coordinate, 'Coordinate')

