"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zod_to_json_schema_1 = require("zod-to-json-schema");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var types_1 = require("../types");
var modelExporter = function (t, name) {
    var r = (0, zod_to_json_schema_1.zodToJsonSchema)(t, { name: name, $refStrategy: 'none' });
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', '..', '..', 'models', "".concat(name, ".json")), JSON.stringify(r.definitions[name], null, 4));
};
modelExporter(types_1.coordinate, 'Coordinate');
//# sourceMappingURL=export-models.js.map