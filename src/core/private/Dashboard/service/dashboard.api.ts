import { RequestMethod } from "../../../../utils/enum";

export const DashboardAPI = {
    getAllPosts: {
        queryKeyName: "GET_ALL_POSTS",
        controllerName: "https://jsonplaceholder.typicode.com/posts",
        requestMethod: RequestMethod.GET
    }
}