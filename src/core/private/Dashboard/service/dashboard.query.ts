import { useQuery } from "@tanstack/react-query"
import { DashboardAPI } from "./dashboard.api"
import performApiAction from "../../../../service/api/ApiRequest/performApiAction";
import { BackendSuccessResponse } from "../../../../service/api/ApiRequest/api-interface";

const { getAllPosts } = DashboardAPI;
export const useGetAllPost = () => {
    return useQuery([getAllPosts.queryKeyName],
        () => performApiAction<BackendSuccessResponse<unknown[]>>(
            { apiDetails: getAllPosts }
        ), {
        select: (data) => {
            return data
        }
    })
}