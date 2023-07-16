import { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { JsonObject, Primitive } from "type-fest";
import { RequestBodyType, RequestMethod } from "../../../utils/enum";
import TokenService from "../../token/token.service";
import { ApiDetailType, RequestDataType } from "./api-types";
import { BackendErrorResponse, ManagedAxiosError, TransformedRequestData, basicAuth } from "./api-interface";

export const sanitizeApiController = (apiDetails: ApiDetailType, pathVariables?: { [key: string]: Primitive }): ApiDetailType => {
    return {
        ...apiDetails,
        controllerName: pathParamSanitizer(apiDetails.controllerName, pathVariables, '{}')
    }
}

const pathParamSanitizer = (path: string, params: GenericObj<Primitive> | undefined, identifier: '{}' | ':' = ':') => {
    return Object.entries(params || {}).reduce(
        (acc, [key, value]) =>
            acc = acc.replace(identifier === '{}' ? `{${key}}` : `:${key}`, String(value)), path
    )
}

export const getAxiosParams = (apiDetails: ApiDetailType) => {
    const axiosRequestParams: AxiosRequestConfig = {
        baseURL: apiDetails.baseUrl,
        url: apiDetails.controllerName,
        method: apiDetails.requestMethod || RequestMethod.GET,
        responseType: 'json',
        timeout: 60 * 3 * 1000,
        headers: apiDetails ? getRequestHeaders(apiDetails) : {},
    }
    if (apiDetails.requestBodyType === RequestBodyType.FILE)
        axiosRequestParams.responseType = 'blob'

    return axiosRequestParams
}


export const getRequestHeaders = (apiDetails: ApiDetailType) => {
    const token = TokenService.getAccessToken()

    let headers: RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        'Accept-Language':
            localStorage.getItem('i18nextLng') === 'ne' ? 'np-NP' : 'en-EN',
        ...(token && { Authorization: `Bearer ${token}` }),
    }

    switch (apiDetails.requestBodyType) {
        case 'AUTH':
            headers = {
                ...headers,
                'Content-Type': 'multipart/form-data',
                // 'Authorization':`Basic ${ JSON.stringify(encodedToken)}`
            }
            break
        case 'QUERY-STRING':
            headers = {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            break
        case 'FORM-DATA':
            headers = {
                ...headers,
                'Content-Type': 'multipart/form-data',
            }
            break
        case 'NO-AUTH':
            delete headers.Authorization
            break
        default:
            headers = { ...headers }
    }
    // console.log(headers,'headers')
    return headers
}

export const transformRequestData = (
    apiDetails: ApiDetailType,
    requestData?: RequestDataType
) => {
    if (!requestData) return {}
    const transformedRequestData: TransformedRequestData = { data: requestData }

    switch (apiDetails.requestBodyType) {
        case 'AUTH':
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            transformedRequestData.auth = basicAuth
            transformedRequestData.data = getFormData(requestData)
            break
        case 'NO-AUTH':
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            transformedRequestData.auth = basicAuth
            transformedRequestData.data = requestData
            break
        case 'FORM-DATA':
            transformedRequestData.data = getFormData(requestData)
            break
        case 'QUERY-STRING':
            transformedRequestData.data = getQueryString(requestData as GenericObj)
            break
        default:
            transformedRequestData.data = requestData
            break
    }
    return transformedRequestData
}

export const getFormData = (requestData: RequestDataType) => {
    const formData = new FormData()
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const data in requestData) {
        const requestDataPair = requestData[data]
        if (Array.isArray(requestDataPair)) {
            requestDataPair.forEach((dataEl, index: number) => {
                if (
                    dataEl instanceof Object &&
                    !(dataEl instanceof File || dataEl instanceof Blob)
                ) {
                    Object.keys(dataEl).forEach((elKey) =>
                        formData.append(`${data}[${index}].${elKey}`, dataEl[elKey])
                    )
                } else if (dataEl instanceof File) {
                    // formData.append(data, dataEl);
                    formData.append(`${data}[${index}]`, dataEl)
                } else if (typeof dataEl === 'number' || typeof dataEl === 'string') {
                    formData.append(`${data}[${index}]`, dataEl.toString())
                }
            })
        } else if (
            requestData[data] instanceof Object &&
            !(requestData[data] instanceof File) &&
            !(requestData[data] instanceof Blob)
        ) {
            // Object.entries(requestData[data]).forEach(([key, value]) =>
            //   formData.append(`${data}.${key}`, value)
            // )
        } else {
            formData.append(data, requestData[data] as string)
        }
    }
    return formData
}

function getQueryString(data: GenericObj) {
    return new URLSearchParams(data)
}


export const handleLogout = () => {
    TokenService.clearToken()
    window.location.reload()
}

export const manageErrorResponse = (
    error: AxiosError<BackendErrorResponse<JsonObject>>
): ManagedAxiosError => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { message, config, request, response, isAxiosError } = error
    const errorResponse = {
        message, // Something happened in setting up the request that triggered an Error
        data: response?.data as unknown as BackendErrorResponse<JsonObject>,
        status: response?.status || false,
        noconnection: false,
        config, // Request Params Configs
        isAxiosError, // If Axios Error
    }
    if (response) {
        errorResponse.data = {
            ...response.data,
            success: false,
        } // The server responded with a status code and data
    } else if (request) {
        errorResponse.message = 'Server could not be reached.' // No response was received
        errorResponse.noconnection = true
    }

    return errorResponse
}


class HttpException<
    TError = ManagedAxiosError<BackendErrorResponse<GenericObj>>
> extends Error {
    public error: TError

    public status?: number

    constructor(error: TError, status?: number) {
        super()
        this.status = status
        this.error = error
    }
}

export default HttpException
