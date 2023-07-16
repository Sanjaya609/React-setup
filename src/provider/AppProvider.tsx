import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface AppProviderProps {
    children: React.ReactNode
}


const queryClient = new QueryClient({
    /**
     * These are the default options provided for every query and mutation.
     * These can be overridden while using the hook
     */
    defaultOptions: {
        mutations: {
            retry: false,
            // since we do not need the cache of mutation, we have disabled cache of mutation
            cacheTime: 0,
        },
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            // Time to stale request and re-fetch in background
            staleTime: 5 * 1000,
        },
    },
})
export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
