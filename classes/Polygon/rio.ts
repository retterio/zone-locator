
// This is an auto generated file!

import RDK, { KeyValueString, GetInstance, CloudObjectResponse } from '@retter/rdk'

interface RetterRequest<T> extends Omit<GetInstance, 'classId'|'body'> {
    body?: T
}

interface RetterResponse<T> extends CloudObjectResponse {
    body?: T
}

// To parse this data:
//
//   import { Convert, RioModels } from "./file";
//
//   const rioModels = Convert.toRioModels(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toRioModels(json: string): any[] | boolean | number | number | { [key: string]: any } | null | string {
        return cast(JSON.parse(json), u(a("any"), true, 3.14, 0, m("any"), null, ""));
    }

    public static rioModelsToJson(value: any[] | boolean | number | number | { [key: string]: any } | null | string): string {
        return JSON.stringify(uncast(value, u(a("any"), true, 3.14, 0, m("any"), null, "")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
};



export interface RDKOptions<T = KeyValueString> {
    httpMethod?: string
    queryStringParams?: T
    headers?: KeyValueString
}

export namespace Classes {
    /** Polygon Class */
export class Polygon {
    private readonly _rdk: RDK
    private readonly lookupKey?: { name: string; value: string }
    public readonly instanceId?: string
    public isNewInstance?: boolean
    public _response?: any

    /**
     * use this constructor if you know the instance id.
     * @param {string} instanceId - instance id
     * @returns {Polygon}
     */
    public constructor(instanceId: string);
    /**
     * use this constructor if you know only the look up key.
     * @param {string} name - look up key name
     * @param {string} value - look up key value
     * @returns {Polygon}
     */
    public constructor(name: string, value: string);
    public constructor(...args: string[]) {
        this.isNewInstance = false
        this._rdk = new RDK()
        if (args.length === 0 || args.length > 2) {
            throw new Error('Invalid number of arguments.');
        }
        if (args.length === 2) this.lookupKey = { name: args[0], value: args[1] }
        else this.instanceId = args[0]
    }

    get rdk() { return this._rdk }

    /**
     * Gets a cloud object instance or creates new one
     * @param {RetterRequest<any>} options - instance options
     * @returns {Promise<Polygon>}
     */
    public static async getInstance(options?: RetterRequest<any>): Promise<Polygon> {
        const rdk = new RDK()
        const result = await rdk.getInstance({
            ...options,
            classId: 'Polygon',
        })
        if (result && 200 <= result.statusCode && result.statusCode < 300) {
            const _instance = new Polygon(result.body.instanceId)
            _instance.isNewInstance = !!result.body.newInstance
            _instance._response = result.body.response
            return _instance
        }

        throw new Error(result?.body?.message || (typeof result?.body?.error === 'string' ? result?.body?.error : undefined) ||  'failed')
    }

    /**
 * calls createNewZone on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async createNewZone(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'createNewZone',
        body,
    })
}

/**
 * calls getZoneInfo on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async getZoneInfo(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'getZoneInfo',
        body,
    })
}

/**
 * calls deleteZone on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async deleteZone(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'deleteZone',
        body,
    })
}

/**
 * calls locate on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async locate(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'locate',
        body,
    })
}

/**
 * calls updatePolygon on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async updatePolygon(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'updatePolygon',
        body,
    })
}

/**
 * calls isInsidePoly on Polygon
 * @param {any} body - payload
 * @param {RDKOptions} options - other method call parameters
 * @returns {Promise<RetterResponse<any>>}
 */
public async isInsidePoly(body?: any, options?: RDKOptions): Promise<RetterResponse<any> | undefined> {
    return await this._rdk.methodCall({
        ...options,
        classId: 'Polygon',
        instanceId: this.instanceId,
        lookupKey: this.lookupKey,
        methodName: 'isInsidePoly',
        body,
    })
}
}
}

export namespace RioAssets {
    export enum Polygon {
    CREATE_NEW_ZONE = 'createNewZone',
    GET_ZONE_INFO = 'getZoneInfo',
    DELETE_ZONE = 'deleteZone',
    LOCATE = 'locate',
    UPDATE_POLYGON = 'updatePolygon',
    IS_INSIDE_POLY = 'isInsidePoly',
}
}
