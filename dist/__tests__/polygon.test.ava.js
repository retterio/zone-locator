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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var polygon_1 = require("../polygon");
var ava_1 = __importDefault(require("ava"));
var lodash_1 = require("lodash");
var getMockedData = function () { return ({
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
}); };
ava_1.default.serial('crud', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = (0, lodash_1.cloneDeep)(getMockedData());
                data.request.body = {
                    coordinates: [],
                    id: "1",
                    name: "First Zone",
                };
                t.deepEqual(data.state.public, { zones: [] });
                return [4 /*yield*/, (0, polygon_1.insertZone)(data)];
            case 1:
                _a.sent();
                t.deepEqual(data.state.public, { zones: [
                        {
                            coordinates: [],
                            id: "1",
                            name: "First Zone",
                        }
                    ] });
                data.request.body = {
                    coordinates: [],
                    id: "2",
                    name: "Second Zone",
                };
                return [4 /*yield*/, (0, polygon_1.insertZone)(data)];
            case 2:
                _a.sent();
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
                    ] });
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
                };
                return [4 /*yield*/, (0, polygon_1.insertZone)(data)];
            case 3:
                _a.sent();
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
                    ] });
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
                };
                return [4 /*yield*/, (0, polygon_1.insertZone)(data)];
            case 4:
                _a.sent();
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
                    ] });
                t.deepEqual(data.response, {
                    statusCode: 400,
                    body: { succes: false, error: "Zone with id of 1 already exists!" },
                });
                data.response = {};
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
                };
                return [4 /*yield*/, (0, polygon_1.updateZone)(data)];
            case 5:
                _a.sent();
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
                    ] });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial('locateZone', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = (0, lodash_1.cloneDeep)(getMockedData());
                data.state.public = { zones: [
                        {
                            coordinates: [
                                [0, 0],
                                [0, 2],
                                [2, 0],
                                [2, 2],
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
                                [0, 0],
                                [0, 1],
                                [1, 0],
                                [1, 1],
                            ],
                            id: "3",
                            name: "Third Zone",
                        }
                    ] };
                data.request.body = {
                    lat: 1.5,
                    lon: 1,
                };
                return [4 /*yield*/, (0, polygon_1.locateZone)(data)];
            case 1:
                _a.sent();
                t.deepEqual(data.response, {
                    statusCode: 200,
                    body: { success: true, zoneIds: ["1"] },
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=polygon.test.ava.js.map