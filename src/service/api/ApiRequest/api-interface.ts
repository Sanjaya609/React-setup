import { AxiosBasicCredentials, AxiosRequestConfig } from "axios"
import { JsonObject } from "type-fest"

export interface BackendSuccessResponse<T> {
    data: T
    status: number
    message: string
    success: true
}

export interface BackendErrorResponse<T> {
    error: T
    status: number
    message: string
    success: false
}

export interface TransformedRequestData {
    auth?: AxiosBasicCredentials
    data: unknown
}

export const basicAuth: AxiosBasicCredentials = {
    username: '',
    password: '',
}

export interface ManagedAxiosError<Data = BackendErrorResponse<JsonObject>> {
    message: string
    data: Data
    status: number | boolean
    noconnection: boolean
    config: AxiosRequestConfig | undefined
    isAxiosError: boolean
    code?: string
}