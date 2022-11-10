"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = exports.coordinate = void 0;
var zod_1 = require("zod");
exports.coordinate = zod_1.z.object({
    lat: zod_1.z.number(),
    lon: zod_1.z.number()
});
exports.Zone = zod_1.z.object({
    coordinates: exports.coordinate.array(),
    id: zod_1.z.string(),
    name: zod_1.z.string()
});
//# sourceMappingURL=types.js.map