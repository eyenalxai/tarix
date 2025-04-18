"use client"

import {
	QueryClient,
	QueryClientProvider,
	isServer
} from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	// Server: always make a new query client
	if (isServer) return makeQueryClient()
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
