import { Suspense } from "react"
import { RouteObject } from "react-router"

export interface CreateRoute
    extends Omit<RouteObject, 'element' | 'index'> {
    element: React.LazyExoticComponent<React.FC>
    fallbackLoader?: React.ReactNode
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRoute = (route: CreateRoute) => {
    const { element: Element, fallbackLoader = <p>Loading</p> } = route
    return {
        ...route,
        element: <Suspense fallback={fallbackLoader}><Element /></Suspense>,
        errorElement: <p>Error</p>
    }
}