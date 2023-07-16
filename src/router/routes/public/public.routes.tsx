import { lazy } from "react";
import { createRoute } from "../createRoutes";
import { publicRoutePath } from "./publicRoute.path";


const Login = lazy(() => import('../../../core/public/Login/Login'))
const ChangePassword = lazy(() => import('../../../core/public/ChangePassword/ChangePassword'))
const NotFound = lazy(() => import("../../../core/NotFound"))

export const publicRoutes = [
    createRoute({
        path: publicRoutePath.login,
        element: Login,
    }),
    createRoute({
        path: publicRoutePath.changePassword,
        element: ChangePassword,
    }),
    createRoute({
        path: "*",
        element: NotFound
    })
]