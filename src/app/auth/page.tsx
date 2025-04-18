"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/auth-client"
import { cn } from "@/lib/utils"

export default function App() {
	return (
		<div className={cn("flex w-screen mt-24 justify-center")}>
			<Button
				onClick={async () =>
					await authClient.signIn.social({
						provider: "github"
					})
				}
			>
				Sign in with GitHub
			</Button>
		</div>
	)
}
