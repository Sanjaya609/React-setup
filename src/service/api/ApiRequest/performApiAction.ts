import { AxiosError, AxiosResponse } from "axios"
import { Primitive } from "type-fest"
import { ApiDetailType, RequestDataType } from "./api-types"
import Axios from 'axios'
import HttpException, { getAxiosParams, manageErrorResponse, sanitizeApiController, transformRequestData } from "./api-schema"
import { BackendErrorResponse } from "./api-interface"

const controller = new AbortController()

export interface InitApiRequest {
    apiDetails: ApiDetailType
    pathVariables?: { [key: string]: Primitive }
    params?: { [key: string]: Primitive | Array<GenericObj<Primitive>> }
    requestData?: RequestDataType
    signal?: AbortSignal
}
const performApiAction = async<TData>({ apiDetails, pathVariables, signal, params, requestData }: InitApiRequest): Promise<AxiosResponse<TData> | undefined> => {
    let sanitizedDetails = apiDetails;
    if (pathVariables) {
        sanitizedDetails = sanitizeApiController(apiDetails, pathVariables)
    }
    try {
        return await Axios.request<TData>({
            ...getAxiosParams(sanitizedDetails),
            params,
            signal: signal ?? controller?.signal,
            ...transformRequestData(sanitizedDetails, requestData),
        })
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        throw new HttpException(
            manageErrorResponse(error as AxiosError<BackendErrorResponse<GenericObj>>)
        )
    }
}

export default performApiAction