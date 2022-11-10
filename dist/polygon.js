"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locateZone = exports.getZones = exports.updateZone = exports.removeZone = exports.insertZone = void 0;
function insertZone(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, coordinates, id_1, name_1, zones, index;
        return __generator(this, function (_b) {
            try {
                _a = data.request.body, coordinates = _a.coordinates, id_1 = _a.id, name_1 = _a.name;
                zones = data.state.public.zones;
                index = zones.findIndex(function (zone) { return zone.id === id_1; });
                if (index !== -1)
                    throw new Error("Zone with id of ".concat(id_1, " already exists!"));
                zones.push({ coordinates: coordinates, id: id_1, name: name_1 });
                data.response = {
                    statusCode: 200,
                    body: { success: true, message: zones },
                };
            }
            catch (e) {
                data.response = {
                    statusCode: 400,
                    body: { succes: false, error: e.message },
                };
            }
            return [2 /*return*/, data];
        });
    });
}
exports.insertZone = insertZone;
function removeZone(data) {
    return __awaiter(this, void 0, void 0, function () {
        var id_2, zones, index;
        return __generator(this, function (_a) {
            try {
                id_2 = data.request.body.id;
                zones = data.state.public.zones;
                index = zones.findIndex(function (zone) { return zone.id === id_2; });
                if (index === -1)
                    throw new Error("Zone with id of ".concat(id_2, " does not exist!"));
                data.state.public.zones = zones.filter(function (zone) { return zone.id !== id_2; });
                data.response = {
                    statusCode: 200,
                    body: { success: true, message: data.state.public.zones },
                };
            }
            catch (e) {
                data.response = {
                    statusCode: 400,
                    body: { succes: false, error: e.message },
                };
            }
            return [2 /*return*/, data];
        });
    });
}
exports.removeZone = removeZone;
function updateZone(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, coordinates, id_3, name_2, zones, index;
        return __generator(this, function (_b) {
            try {
                _a = data.request.body, coordinates = _a.coordinates, id_3 = _a.id, name_2 = _a.name;
                zones = data.state.public.zones;
                index = zones.findIndex(function (zone) { return zone.id === id_3; });
                if (index === -1)
                    throw new Error("Zone with id of ".concat(id_3, " does not exist!"));
                zones[index] = { coordinates: coordinates, id: id_3, name: name_2 };
                data.response = {
                    statusCode: 200,
                    body: { success: true, message: zones },
                };
            }
            catch (e) {
                data.response = {
                    statusCode: 400,
                    body: { succes: false, error: e.message },
                };
            }
            return [2 /*return*/, data];
        });
    });
}
exports.updateZone = updateZone;
function getZones(data) {
    return __awaiter(this, void 0, void 0, function () {
        var zones;
        return __generator(this, function (_a) {
            try {
                zones = data.state.public.zones;
                data.response = {
                    statusCode: 200,
                    body: { success: true, message: zones },
                };
            }
            catch (e) {
                data.response = {
                    statusCode: 400,
                    body: { succes: false, error: e.message },
                };
            }
            return [2 /*return*/, data];
        });
    });
}
exports.getZones = getZones;
var inside = function (zone, coordinate) {
    var x = coordinate.lat;
    var y = coordinate.lon;
    var dots = zone.coordinates;
    for (var i = 0, j = dots.length - 1; i < dots.length; j = i++) {
        var xi = dots[i][0];
        var yi = dots[i][1];
        var xj = dots[j][0];
        var yj = dots[j][1];
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect)
            return true;
    }
    return false;
};
function locateZone(data) {
    return __awaiter(this, void 0, void 0, function () {
        var input_1, zones, zoneIds_1;
        return __generator(this, function (_a) {
            try {
                input_1 = data.request.body;
                zones = data.state.public.zones;
                zoneIds_1 = [];
                zones.forEach(function (zone) {
                    var isInside = inside(zone, input_1);
                    if (isInside)
                        zoneIds_1.push(zone.id);
                });
                data.response = {
                    statusCode: 200,
                    body: { success: true, zoneIds: zoneIds_1 },
                };
            }
            catch (e) {
                data.response = {
                    statusCode: 400,
                    body: { succes: false, error: e.message },
                };
            }
            return [2 /*return*/, data];
        });
    });
}
exports.locateZone = locateZone;
//# sourceMappingURL=polygon.js.map