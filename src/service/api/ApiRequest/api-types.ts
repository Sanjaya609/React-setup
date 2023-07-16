import { RequestBodyType, RequestMethod } from "../../../utils/enum"

export interface ApiDetailType {
    actionName?: string
    controllerName: string
    requestMethod?: RequestMethod
    requestBodyType?: RequestBodyType
    baseUrl?: string
}

export interface RequestDataType {
    [key: string]:
    | ArrayBuffer
    | ArrayBufferView
    | File
    | Blob
    | string
    | boolean
    | number
    | null
    | Date
    | Array<unknown>
}