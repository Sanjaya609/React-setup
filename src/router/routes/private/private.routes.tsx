/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createRoute } from "../createRoutes";
import { privateRoutePath } from "./privateRoute.path";

const Root = lazy(() => import("../../../core/private/Root"));
const Dashboard = lazy(() => import("../../../core/private/Dashboard/Dashboard"))
const NotFound = lazy(() => import("../../../core/NotFound"))

export const privateRoutes = [
    createRoute({
        path: privateRoutePath.base,
        element: Root,
        fallbackLoader: <p>root loading</p>,
        children: [
            createRoute({
                path: privateRoutePath.dashboard,
                element: Dashboard,
            }),
            // createRoute({
            //     path: privateRoutePath.home,
            //     element: Root,
            // })
        ]
    }),
    createRoute({
        path: "*",
        element: NotFound
    })
]