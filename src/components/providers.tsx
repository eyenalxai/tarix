"use client"

import { ReactQueryProvider } from "@/components/react-query-provider"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<ReactQueryProvider>{children}</ReactQueryProvider>
		</NextThemesProvider>
	)
}
